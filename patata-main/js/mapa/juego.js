// ============================================================
//  Motor del mapa 2D: movimiento, animacion y colisiones
// ============================================================

(function () {
  'use strict';

  const contenedor = document.getElementById('game-container');
  const jugador = document.getElementById('player');
  const sprite = document.getElementById('player-sprite');
  const capaDebug = document.getElementById('capa-debug');
  const pista = document.getElementById('pista-tienda');
  const hudPos = document.getElementById('hud-pos');

  const teclas = new Set();

  const estado = {
    x: 50,              // posicion de los pies, en % del mapa
    y: 66,
    personaje: 0,
    frame: 0,
    caminando: false,
    mirando: 1,         // 1 = derecha, -1 = izquierda
    zona: null,
    debug: false,
    tiendaCerca: null,
  };

  // ---------- Zona caminable ----------

  function decodificarZona(def) {
    if (!def || !def.datos) return null;
    const bin = atob(def.datos);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { ancho: def.ancho, alto: def.alto, bytes: bytes };
  }

  function esCaminable(xPct, yPct) {
    const z = estado.zona;
    if (!z) return true; // sin mascara: todo el mapa es caminable

    let cx = Math.floor((xPct / 100) * z.ancho);
    let cy = Math.floor((yPct / 100) * z.alto);
    cx = Math.min(z.ancho - 1, Math.max(0, cx));
    cy = Math.min(z.alto - 1, Math.max(0, cy));

    const i = cy * z.ancho + cx;
    return ((z.bytes[i >> 3] >> (i & 7)) & 1) === 1;
  }

  // ---------- Tamano y limites ----------

  function altoSpritePx() {
    return contenedor.clientHeight * CONFIG.altoSprites;
  }

  function medidasSprite() {
    const altoPx = altoSpritePx();
    const natW = sprite.naturalWidth || 1;
    const natH = sprite.naturalHeight || 1;
    return {
      altoPx: altoPx,
      anchoPx: altoPx * (natW / natH),
      anchoPct: (altoPx * (natW / natH)) / contenedor.clientWidth * 100,
      altoPct: (altoPx / contenedor.clientHeight) * 100,
    };
  }

  function limites() {
    const m = medidasSprite();
    return {
      minX: m.anchoPct / 2,
      maxX: 100 - m.anchoPct / 2,
      minY: m.altoPct,
      maxY: 100,
    };
  }

  // ---------- Movimiento ----------

  function mover(dxPx, dyPx) {
    const lim = limites();
    const dxPct = (dxPx / contenedor.clientWidth) * 100;
    const dyPct = (dyPx / contenedor.clientHeight) * 100;

    // Se resuelve eje por eje: si hay pared, el personaje se desliza.
    let nx = estado.x + dxPct;
    nx = Math.min(lim.maxX, Math.max(lim.minX, nx));
    if (esCaminable(nx, estado.y)) estado.x = nx;

    let ny = estado.y + dyPct;
    ny = Math.min(lim.maxY, Math.max(lim.minY, ny));
    if (esCaminable(estado.x, ny)) estado.y = ny;
  }

  // ---------- Personaje / animacion ----------

  function personajeActual() {
    return PERSONAJES[estado.personaje];
  }

  function aplicarPersonaje() {
    estado.frame = 0;
    sprite.src = personajeActual().frames[0];
    document.querySelectorAll('[data-personaje]').forEach(function (b) {
      b.classList.toggle('activo', Number(b.dataset.personaje) === estado.personaje);
    });
  }

  function siguienteFrame() {
    const frames = personajeActual().frames;
    estado.frame = (estado.frame + 1) % frames.length;
    sprite.src = frames[estado.frame];
  }

  function dibujar() {
    jugador.style.left = estado.x + '%';
    jugador.style.top = estado.y + '%';
    sprite.style.height = altoSpritePx() + 'px';
    sprite.style.transform = 'scaleX(' + estado.mirando + ')';
    if (hudPos) {
      hudPos.textContent = 'x: ' + estado.x.toFixed(1) + '%  y: ' + estado.y.toFixed(1) + '%';
    }
  }

  // ---------- Bucle principal ----------

  let ultimoTiempo = performance.now();
  let acumuladorAnim = 0;

  function bucle(tiempo) {
    const dt = Math.min(0.05, (tiempo - ultimoTiempo) / 1000);
    ultimoTiempo = tiempo;

    let dx = 0;
    let dy = 0;
    if (teclas.has('ArrowUp') || teclas.has('w') || teclas.has('W')) dy -= 1;
    if (teclas.has('ArrowDown') || teclas.has('s') || teclas.has('S')) dy += 1;
    if (teclas.has('ArrowLeft') || teclas.has('a') || teclas.has('A')) dx -= 1;
    if (teclas.has('ArrowRight') || teclas.has('d') || teclas.has('D')) dx += 1;

    estado.caminando = dx !== 0 || dy !== 0;

    if (estado.caminando) {
      const largo = Math.hypot(dx, dy);
      dx /= largo;
      dy /= largo;

      const velPx = contenedor.clientWidth * CONFIG.velocidad;
      mover(dx * velPx * dt, dy * velPx * dt);

      if (dx < 0) estado.mirando = -1;
      else if (dx > 0) estado.mirando = 1;

      acumuladorAnim += dt;
      const intervalo = 1 / CONFIG.fpsAnimacion;
      if (acumuladorAnim >= intervalo) {
        acumuladorAnim = 0;
        siguienteFrame();
      }
    } else {
      acumuladorAnim = 0;
      if (estado.frame !== 0) {
        estado.frame = 0;
        sprite.src = personajeActual().frames[0];
      }
    }

    revisarTiendas();
    dibujar();
    dibujarDebug();
    requestAnimationFrame(bucle);
  }

  // ---------- Tiendas ----------

  function revisarTiendas() {
    const radio = contenedor.clientWidth * CONFIG.radioTienda;
    let cerca = null;

    for (let i = 0; i < TIENDAS.length; i++) {
      const t = TIENDAS[i];
      const dx = ((t.x - estado.x) / 100) * contenedor.clientWidth;
      const dy = ((t.y - estado.y) / 100) * contenedor.clientHeight;
      if (Math.hypot(dx, dy) <= radio) {
        cerca = t;
        break;
      }
    }

    estado.tiendaCerca = cerca;
    if (pista) {
      if (cerca) {
        pista.textContent = 'Presiona E para entrar a ' + cerca.nombre;
        pista.classList.add('visible');
      } else {
        pista.textContent = '';
        pista.classList.remove('visible');
      }
    }
  }

  // ---------- Modo depuracion (tecla G) ----------

  let cacheMascara = null;

  function construirCacheMascara(ancho, alto) {
    const z = estado.zona;
    const c = document.createElement('canvas');
    c.width = ancho;
    c.height = alto;
    const cx = c.getContext('2d');
    cx.fillStyle = 'rgba(60,220,120,0.35)';

    const cw = ancho / z.ancho;
    const ch = alto / z.alto;
    for (let cy = 0; cy < z.alto; cy++) {
      for (let cxi = 0; cxi < z.ancho; cxi++) {
        const i = cy * z.ancho + cxi;
        if (((z.bytes[i >> 3] >> (i & 7)) & 1) === 1) {
          cx.fillRect(cxi * cw, cy * ch, cw + 0.5, ch + 0.5);
        }
      }
    }
    return c;
  }

  function dibujarDebug() {
    if (!estado.debug || !capaDebug) return;

    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;

    if (capaDebug.width !== ancho || capaDebug.height !== alto) {
      capaDebug.width = ancho;
      capaDebug.height = alto;
      cacheMascara = null;
    }

    const ctx = capaDebug.getContext('2d');
    ctx.clearRect(0, 0, ancho, alto);

    // rejilla
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo((x / 10) * ancho, 0);
      ctx.lineTo((x / 10) * ancho, alto);
      ctx.stroke();
    }
    for (let y = 0; y <= 10; y++) {
      ctx.beginPath();
      ctx.moveTo(0, (y / 10) * alto);
      ctx.lineTo(ancho, (y / 10) * alto);
      ctx.stroke();
    }

    // mascara caminable (se dibuja una sola vez y se reutiliza)
    const z = estado.zona;
    if (z) {
      if (!cacheMascara) cacheMascara = construirCacheMascara(ancho, alto);
      ctx.drawImage(cacheMascara, 0, 0);

      ctx.fillStyle = '#fff';
      ctx.font = '12px monospace';
      ctx.fillText('VERDE = caminable', 10, alto - 12);
    } else {
      ctx.fillStyle = 'rgba(255,80,80,0.85)';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('SIN MASCARA: todo el mapa es caminable', 10, alto - 12);
    }

    // punto de los pies
    ctx.fillStyle = '#ffd200';
    ctx.beginPath();
    ctx.arc((estado.x / 100) * ancho, (estado.y / 100) * alto, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---------- Teclado ----------

  window.addEventListener('keydown', function (e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) > -1) {
      e.preventDefault();
    }

    teclas.add(e.key);

    if (e.key === 'g' || e.key === 'G') {
      estado.debug = !estado.debug;
      if (!estado.debug && capaDebug) {
        capaDebug.getContext('2d').clearRect(0, 0, capaDebug.width, capaDebug.height);
      }
    }

    if (e.key === 'e' || e.key === 'E') {
      if (estado.tiendaCerca) abrirTienda(estado.tiendaCerca.nombre);
    }
    // NOTA: Se eliminaron las teclas 1, 2 y 3 para mantener el personaje elegido durante toda la estadia
  });

  window.addEventListener('keyup', function (e) {
    teclas.delete(e.key);
  });

  window.addEventListener('blur', function () {
    teclas.clear();
  });

  window.addEventListener('resize', function () {
    dibujar();
  });

  // ---------- API publica ----------

  function cambiarPersonaje(indice) {
    if (indice < 0 || indice >= PERSONAJES.length) return;
    estado.personaje = indice;
    try { localStorage.setItem('clientePersonaje', indice); } catch(e) {}
    aplicarPersonaje();
    dibujar();
    // Actualizar indicador de personaje en HUD
    const hudChar = document.getElementById('hud-char');
    if (hudChar) hudChar.textContent = PERSONAJES[indice].nombre;
  }

  function abrirTienda(nombre) {
    const tienda = TIENDAS.find(function (t) { 
      return t.nombre.toLowerCase() === nombre.toLowerCase(); 
    });

    if (!tienda) return;

    // Mostrar los productos de esa tienda en el PANEL DERECHO
    if (typeof mostrarTiendaEnPanel === 'function') {
      mostrarTiendaEnPanel(tienda.nombre);
    }

    // Si la pantalla es pequena, hacer scroll suave al panel derecho
    const panelDer = document.getElementById('panel-derecho');
    if (panelDer && window.innerWidth < 1100) {
      panelDer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function comprar(nombre, precio) {
    alert('Compraste ' + nombre + ' por S/ ' + precio + ' en Huacho');
    cerrarTienda();
  }

  function cerrarTienda() {
    if (typeof mostrarPlazaEnPanel === 'function') {
      mostrarPlazaEnPanel();
    }
  }

  function iniciar() {
    estado.zona = decodificarZona(typeof ZONA_CAMINABLE !== 'undefined' ? ZONA_CAMINABLE : null);

    try {
      const guardado = localStorage.getItem('clientePersonaje');
      if (guardado !== null) {
        const idx = Number(guardado);
        if (!isNaN(idx) && idx >= 0 && idx < PERSONAJES.length) {
          estado.personaje = idx;
        } else {
          estado.personaje = 0;
        }
      }
    } catch (e) {
      estado.personaje = 0;
    }

    const imagenes = [];
    PERSONAJES.forEach(function (p) {
      p.frames.forEach(function (src) {
        const im = new Image();
        im.src = src;
        imagenes.push(im);
      });
    });

    // esperar la primera imagen para conocer el tamano real del sprite
    const esperar = personajeActual().frames[0];
    const im = new Image();
    im.onload = function () {
      aplicarPersonaje();
      dibujar();
    };
    im.src = esperar;

    requestAnimationFrame(bucle);
  }

  window.Juego = {
    iniciar: iniciar,
    abrirTienda: abrirTienda,
    cerrarTienda: cerrarTienda,
    comprar: comprar,
    cambiarPersonaje: cambiarPersonaje,
  };
})();
