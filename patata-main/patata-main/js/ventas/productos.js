// ============================================================
// SISTEMA DE PRODUCTOS Y GESTIÓN DEL PANEL DERECHO
// ============================================================

// Array plano con todos los productos de todas las tiendas para el carrito
function obtenerTodosLosProductos() {
  if (typeof TIENDAS === 'undefined') return [];
  const lista = [];
  TIENDAS.forEach(tienda => {
    tienda.productos.forEach(prod => {
      lista.push({
        ...prod,
        tiendaId: tienda.id,
        tiendaNombre: tienda.nombre,
        tiendaIcono: tienda.icono,
      });
    });
  });
  return lista;
}

// Variable global para compatibilidad con carrito.js
let productos = obtenerTodosLosProductos();

// Tienda actualmente abierta en el panel derecho (null = en la plaza)
let tiendaActiva = null;
let filtroCategoriaActivo = 'Todas';

// ============================================================
// 1. MOSTRAR LA PLAZA DE ARMAS (ESTADO POR DEFECTO)
// ============================================================
function mostrarPlazaEnPanel() {
  tiendaActiva = null;
  const panel = document.getElementById('panel-derecho-contenido');
  if (!panel) return;

  const puntosActuales = typeof obtenerPuntos === 'function' ? obtenerPuntos() : 0;

  // Lista de nombres de tiendas (SIN indicar que productos contienen)
  let listaTiendasHtml = '';
  TIENDAS.forEach(t => {
    listaTiendasHtml += `
      <div class="tienda-plaza-item" onclick="Juego && Juego.abrirTienda('${t.nombre}')">
        <div class="tienda-plaza-icono">${t.icono}</div>
        <div class="tienda-plaza-info">
          <h4>${t.nombre}</h4>
          <span class="tienda-plaza-hint">📍 Presiona E o haz clic para entrar</span>
        </div>
        <button type="button" class="btn-visitar-tienda">Entrar</button>
      </div>
    `;
  });

  // Lista de canjes disponibles con puntos acumulados
  let canjesHtml = '';
  if (typeof CANJES_PLAZA !== 'undefined') {
    CANJES_PLAZA.forEach(c => {
      const puedeCanjear = puntosActuales >= c.costoPuntos;
      canjesHtml += `
        <div class="canje-card ${puedeCanjear ? 'canje-disponible' : 'canje-bloqueado'}">
          <div class="canje-icono">${c.icono}</div>
          <div class="canje-info">
            <h5>${c.nombre}</h5>
            <p>${c.desc}</p>
            <span class="canje-costo">⭐ ${c.costoPuntos} Puntos</span>
          </div>
          <button type="button" 
                  class="btn-canjear" 
                  onclick="canjearPremioPlaza(${c.id})"
                  ${!puedeCanjear ? 'disabled' : ''}>
            ${puedeCanjear ? 'Canjear' : 'Faltan pts'}
          </button>
        </div>
      `;
    });
  }

  panel.innerHTML = `
    <div class="plaza-panel-header">
      <div class="plaza-badge">🌳 Espacio Público</div>
      <h2>🏛️ Plaza de Armas de Huacho</h2>
      <p class="plaza-subtitulo">
        Lugar de paseo, recreación e historia. Camina libremente por la plaza. Para realizar compras, ingresa a cualquiera de los locales comerciales.
      </p>
    </div>

    <div class="seccion-tiendas-plaza">
      <h3 class="titulo-seccion">🏪 Establecimientos en los alrededores</h3>
      <p class="texto-ayuda">Acércate a un local y presiona <b>E</b> para ver qué productos ofrece:</p>
      <div class="lista-tiendas-plaza">
        ${listaTiendasHtml}
      </div>
    </div>

    <div class="seccion-canjes-plaza">
      <div class="canjes-header">
        <h3 class="titulo-seccion">⭐ Canjes de la Plaza de Armas</h3>
        <span class="badge-mis-puntos">Tus puntos: <b>${puntosActuales}</b></span>
      </div>
      <p class="texto-ayuda">Ganas 1 punto por cada sol gastado en las tiendas. ¡Canjéalos aquí!</p>
      <div class="lista-canjes">
        ${canjesHtml}
      </div>
    </div>
  `;
}

// ============================================================
// 2. MOSTRAR TIENDA EN EL PANEL DERECHO AL PRESIONAR "E"
// ============================================================
function mostrarTiendaEnPanel(nombreTienda, categoriaFiltro = 'Todas') {
  const tienda = TIENDAS.find(t => t.nombre.toLowerCase() === nombreTienda.toLowerCase());
  if (!tienda) {
    console.warn("Tienda no encontrada:", nombreTienda);
    return;
  }

  tiendaActiva = tienda;
  filtroCategoriaActivo = categoriaFiltro;

  const panel = document.getElementById('panel-derecho-contenido');
  if (!panel) return;

  // Actualizar lista plana de productos por si acaso
  productos = obtenerTodosLosProductos();

  // Obtener categorías únicas de esta tienda
  const categorias = ['Todas', ...new Set(tienda.productos.map(p => p.categoria))];

  // Filtros de categoría para la tienda
  let filtrosHtml = '';
  if (categorias.length > 2) {
    filtrosHtml = '<div class="tienda-filtros">';
    categorias.forEach(cat => {
      const activo = cat === categoriaFiltro ? 'activo' : '';
      filtrosHtml += `
        <button type="button" 
                class="btn-cat ${activo}" 
                onclick="mostrarTiendaEnPanel('${tienda.nombre}', '${cat}')">
          ${cat}
        </button>
      `;
    });
    filtrosHtml += '</div>';
  }

  // Filtrar productos
  const productosFiltrados = categoriaFiltro === 'Todas'
    ? tienda.productos
    : tienda.productos.filter(p => p.categoria === categoriaFiltro);

  let productosHtml = '';
  productosFiltrados.forEach(p => {
    const puntosQueOtorga = Math.round(p.precio);
    productosHtml += `
      <div class="producto-card-tienda">
        <div class="prod-tienda-header">
          <span class="prod-tienda-nombre">${p.nombre}</span>
          <span class="prod-tienda-precio">S/ ${p.precio.toFixed(2)}</span>
        </div>
        <p class="prod-tienda-desc">${p.desc || ''}</p>
        <div class="prod-tienda-footer">
          <span class="prod-tienda-puntos">⭐ +${puntosQueOtorga} pts</span>
          <button type="button" 
                  class="btn-agregar-tienda" 
                  onclick="agregarAlCarrito(${p.id})">
            🛒 + Agregar
          </button>
        </div>
      </div>
    `;
  });

  panel.innerHTML = `
    <div class="tienda-panel-header">
      <div class="tienda-panel-top">
        <span class="tienda-icono-badge">${tienda.icono}</span>
        <div>
          <h2>${tienda.nombre}</h2>
          <span class="tienda-estado-badge">🟢 Abierto ahora</span>
        </div>
      </div>
      <p class="tienda-panel-desc">${tienda.descripcion}</p>
      <button type="button" class="btn-salir-plaza" onclick="mostrarPlazaEnPanel()">
        🚶 Salir a pasear por la Plaza
      </button>
    </div>

    ${filtrosHtml}

    <div class="lista-productos-tienda">
      ${productosHtml}
    </div>

    <div class="tienda-panel-bottom">
      <button type="button" class="btn-salir-plaza secundario" onclick="mostrarPlazaEnPanel()">
        ⬅ Volver al recorrido de la Plaza
      </button>
    </div>
  `;

  // Notificación toast visual
  if (typeof mostrarToast === 'function') {
    mostrarToast(`Entraste a ${tienda.nombre}`);
  }
}

// Inicializar vista al cargar
document.addEventListener('DOMContentLoaded', function () {
  productos = obtenerTodosLosProductos();
  mostrarPlazaEnPanel();
});