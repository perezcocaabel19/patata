// ============================================================
// CARRITO DE COMPRAS Y SISTEMA DE PUNTOS DE LA PLAZA DE ARMAS
// ============================================================

let carrito = [];

// ===============================
// SISTEMA DE PUNTOS
// ===============================
function obtenerPuntos() {
  const guardado = localStorage.getItem('clientePuntos');
  if (guardado !== null) {
    const val = parseInt(guardado, 10);
    return isNaN(val) ? 0 : val;
  }
  // Puntos iniciales de cortesía para nuevos visitantes
  localStorage.setItem('clientePuntos', '50');
  return 50;
}

function guardarPuntos(nuevosPuntos) {
  const pts = Math.max(0, parseInt(nuevosPuntos, 10) || 0);
  localStorage.setItem('clientePuntos', pts.toString());
  actualizarPuntosUI();
}

function actualizarPuntosUI() {
  const pts = obtenerPuntos();

  // Actualizar badges en panel izquierdo
  const badgeCart = document.getElementById('puntos-badge-izq');
  if (badgeCart) badgeCart.textContent = `${pts} pts`;

  // Actualizar en barra superior
  const badgeTop = document.getElementById('hud-puntos');
  if (badgeTop) badgeTop.textContent = `⭐ ${pts} pts`;

  // Si el panel de la plaza está abierto, refrescar para actualizar botones de canje
  if (typeof tiendaActiva !== 'undefined' && tiendaActiva === null) {
    if (typeof mostrarPlazaEnPanel === 'function') {
      mostrarPlazaEnPanel();
    }
  }
}

// ===============================
// TOAST NOTIFICACIÓN
// ===============================
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast-mensaje');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-mensaje';
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2200);
}

// ===============================
// AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(id) {
  // Asegurarse de tener la lista de productos actualizada
  if (typeof obtenerTodosLosProductos === 'function') {
    productos = obtenerTodosLosProductos();
  }

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    console.warn('Producto no encontrado con id:', id);
    return;
  }

  const productoCarrito = carrito.find(item => item.id === id);

  if (productoCarrito) {
    productoCarrito.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  mostrarToast(`✓ Agregado: ${producto.nombre}`);
  mostrarCarrito();
}

// ===============================
// MOSTRAR CARRITO (PANEL IZQUIERDO)
// ===============================
function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  if (!listaCarrito) return;

  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <div class="carrito-vacio-box">
        <span class="icono-vacio">🛒</span>
        <p class="vacio-titulo">Tu carrito está vacío</p>
        <p class="vacio-desc">Visita los establecimientos de la plaza y presiona <b>E</b> para agregar productos.</p>
      </div>
    `;
    calcularTotal();
    return;
  }

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    const elemento = document.createElement('div');
    elemento.classList.add('item-carrito-izq');

    elemento.innerHTML = `
      <div class="item-izq-cabecera">
        <span class="item-izq-nombre">${producto.nombre}</span>
        <button type="button" class="btn-eliminar-item" onclick="eliminarDelCarrito(${producto.id})" title="Eliminar">✕</button>
      </div>
      <div class="item-izq-tienda">${producto.tiendaIcono || '🏪'} ${producto.tiendaNombre || producto.categoria || ''}</div>
      <div class="item-izq-detalles">
        <span class="item-izq-precio">S/ ${producto.precio.toFixed(2)} c/u</span>
        <div class="controles-cantidad-izq">
          <button type="button" class="btn-cant" onclick="disminuirCantidad(${producto.id})">−</button>
          <span class="cant-num">${producto.cantidad}</span>
          <button type="button" class="btn-cant" onclick="aumentarCantidad(${producto.id})">+</button>
        </div>
      </div>
      <div class="item-izq-subtotal">Subtotal: S/ ${subtotal.toFixed(2)}</div>
    `;

    listaCarrito.appendChild(elemento);
  });

  calcularTotal();
}

// ===============================
// CANTIDADES Y ELIMINACIÓN
// ===============================
function aumentarCantidad(id) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  item.cantidad++;
  mostrarCarrito();
}

function disminuirCantidad(id) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    eliminarDelCarrito(id);
    return;
  }
  mostrarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  mostrarCarrito();
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (confirm('¿Deseas vaciar todos los productos del carrito?')) {
    carrito = [];
    mostrarCarrito();
    mostrarToast('Carrito vaciado');
  }
}

// ===============================
// CALCULAR TOTAL Y PUNTOS A GANAR
// ===============================
function calcularTotal() {
  const total = carrito.reduce(
    (suma, producto) => suma + (producto.precio * producto.cantidad),
    0
  );

  const totalEl = document.getElementById('total');
  if (totalEl) {
    totalEl.textContent = total.toFixed(2);
  }

  // Puntos a ganar con esta compra (1 sol = 1 punto)
  const puntosAGanar = Math.round(total);
  const puntosGanarEl = document.getElementById('puntos-a-ganar');
  if (puntosGanarEl) {
    puntosGanarEl.textContent = `+${puntosAGanar} pts`;
  }

  const badgeCount = document.getElementById('cant-articulos-carrito');
  if (badgeCount) {
    const cantTotal = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    badgeCount.textContent = cantTotal.toString();
  }

  return total;
}

// ===============================
// PAGAR PEDIDO Y ACUMULAR PUNTOS
// ===============================
function pagarCarrito() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos en las tiendas de la plaza para realizar una compra.');
    return;
  }

  const total = calcularTotal();
  const puntosGanados = Math.round(total);
  const clienteNombre = localStorage.getItem('clienteNombre') || 'Visitante';

  // Acumular puntos
  const puntosPrevios = obtenerPuntos();
  const nuevosPuntos = puntosPrevios + puntosGanados;
  guardarPuntos(nuevosPuntos);

  const cantArticulos = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  const mensaje = `🎉 ¡COMPRA REALIZADA CON ÉXITO!\n\n` +
    `👤 Cliente: ${clienteNombre}\n` +
    `🛍️ Artículos comprados: ${cantArticulos}\n` +
    `💵 Total pagado: S/ ${total.toFixed(2)}\n\n` +
    `⭐ ¡GANASTE +${puntosGanados} PUNTOS!\n` +
    `Total de puntos acumulados: ${nuevosPuntos} pts\n\n` +
    `Recuerda que puedes canjear tus puntos por premios en la Plaza de Armas de Huacho.`;

  alert(mensaje);

  carrito = [];
  mostrarCarrito();
  mostrarToast(`¡Compra exitosa! +${puntosGanados} puntos ganados`);

  // Actualizar la vista de la plaza para desbloquear canjes si corresponde
  if (typeof mostrarPlazaEnPanel === 'function') {
    mostrarPlazaEnPanel();
  }
}

// ===============================
// CANJEAR PREMIOS EN LA PLAZA DE ARMAS
// ===============================
function canjearPremioPlaza(idCanje) {
  if (typeof CANJES_PLAZA === 'undefined') return;

  const canje = CANJES_PLAZA.find(c => c.id === idCanje);
  if (!canje) return;

  const puntosActuales = obtenerPuntos();
  const clienteNombre = localStorage.getItem('clienteNombre') || 'Visitante';

  if (puntosActuales < canje.costoPuntos) {
    const faltan = canje.costoPuntos - puntosActuales;
    alert(`⭐ PUNTOS INSUFICIENTES\n\n` +
      `El premio "${canje.nombre}" cuesta ${canje.costoPuntos} puntos.\n` +
      `Actualmente tienes ${puntosActuales} puntos (te faltan ${faltan} pts).\n\n` +
      `¡Sigue comprando en las tiendas de la Plaza de Armas para acumular más puntos!`);
    return;
  }

  const confirmacion = confirm(`¿Deseas canjear "${canje.nombre}" por ${canje.costoPuntos} puntos?`);
  if (!confirmacion) return;

  // Descontar puntos
  const restantes = puntosActuales - canje.costoPuntos;
  guardarPuntos(restantes);

  alert(`🎁 ¡FELICIDADES, ${clienteNombre.toUpperCase()}!\n\n` +
    `Has canjeado con éxito:\n` +
    `✨ ${canje.icono} ${canje.nombre}\n\n` +
    `Puntos restantes: ${restantes} pts\n` +
    `¡Disfruta de tu paseo por la Plaza de Armas de Huacho!`);

  mostrarToast(`✓ Canjeado: ${canje.nombre}`);
  actualizarPuntosUI();
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function () {
  actualizarPuntosUI();
  mostrarCarrito();
});