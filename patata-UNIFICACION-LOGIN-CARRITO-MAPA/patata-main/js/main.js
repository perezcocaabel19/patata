// ============================================================
// ARRANQUE DEL JUEGO Y GESTIÓN DE SESIÓN DE LA PLAZA DE ARMAS
// ============================================================

let personajeLoginSeleccionado = 0;

// ===============================
// MODAL DE INICIO DE SESIÓN
// ===============================
function abrirModalLogin() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('input-nombre');
    if (input) {
      input.value = localStorage.getItem('clienteNombre') || '';
      input.focus();
    }
  }
}

function cerrarModalLogin() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function seleccionarPersonajeLogin(idx) {
  // Solo se permiten 0 (P1 - Chico) y 1 (P2 - Chica)
  personajeLoginSeleccionado = (idx === 1) ? 1 : 0;
  document.querySelectorAll('.card-personaje').forEach((card, i) => {
    card.classList.toggle('activo', i === personajeLoginSeleccionado);
  });
}

function iniciarSesion(e) {
  if (e) e.preventDefault();

  const input = document.getElementById('input-nombre');
  const nombre = input && input.value.trim() ? input.value.trim() : 'Visitante';

  // Guardar en localStorage de forma permanente durante la estadía
  localStorage.setItem('clienteNombre', nombre);
  localStorage.setItem('clientePersonaje', personajeLoginSeleccionado.toString());

  // Iniciar puntos si no existen
  if (localStorage.getItem('clientePuntos') === null) {
    localStorage.setItem('clientePuntos', '50');
  }

  // Establecer el personaje en el motor del juego
  if (window.Juego && typeof window.Juego.cambiarPersonaje === 'function') {
    window.Juego.cambiarPersonaje(personajeLoginSeleccionado);
  }

  // Actualizar la interfaz
  actualizarInfoClienteUI(nombre, personajeLoginSeleccionado);

  cerrarModalLogin();

  if (typeof mostrarToast === 'function') {
    const charNombre = personajeLoginSeleccionado === 0 ? 'P1 (Chico)' : 'P2 (Chica)';
    mostrarToast(`¡Bienvenido a la Plaza de Huacho, ${nombre}! (${charNombre})`);
  }

  // Asegurar que el panel derecho muestre la Plaza de Armas inicialmente
  if (typeof mostrarPlazaEnPanel === 'function') {
    mostrarPlazaEnPanel();
  }
}

function salirDeLaPlaza() {
  if (confirm('¿Deseas salir de la Plaza de Armas de Huacho y cambiar de personaje?')) {
    localStorage.removeItem('clienteNombre');
    localStorage.removeItem('clientePersonaje');
    abrirModalLogin();
  }
}

function actualizarInfoClienteUI(nombre, personajeIdx) {
  const hudCliente = document.getElementById('hud-cliente');
  if (hudCliente) {
    const charNombre = personajeIdx === 0 ? 'P1 - Chico' : 'P2 - Chica';
    hudCliente.innerHTML = `👤 <b>${nombre}</b> | 🎮 <span>${charNombre}</span>`;
  }

  const barraNombre = document.getElementById('barra-cliente-nombre');
  if (barraNombre) {
    barraNombre.textContent = nombre;
  }

  const barraChar = document.getElementById('barra-personaje-tipo');
  if (barraChar) {
    barraChar.textContent = personajeIdx === 0 ? 'Chico' : 'Chica';
  }

  // Refrescar puntos en toda la interfaz
  if (typeof actualizarPuntosUI === 'function') {
    actualizarPuntosUI();
  }
}

// ===============================
// INICIALIZACIÓN GENERAL
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  // Asignar eventos de clic a todos los triggers de tiendas sobre el mapa
  document.querySelectorAll('.shop-trigger').forEach(function (boton) {
    boton.addEventListener('click', function () {
      if (window.Juego) {
        window.Juego.abrirTienda(boton.title);
      }
    });
  });

  // Iniciar el motor del mapa
  if (window.Juego && typeof window.Juego.iniciar === 'function') {
    window.Juego.iniciar();
  }

  // Comprobar si ya hay una sesión iniciada
  const clienteGuardado = localStorage.getItem('clienteNombre');
  const personajeGuardado = localStorage.getItem('clientePersonaje');

  if (clienteGuardado && personajeGuardado !== null) {
    const idx = parseInt(personajeGuardado, 10) || 0;
    seleccionarPersonajeLogin(idx);
    actualizarInfoClienteUI(clienteGuardado, idx);
    if (window.Juego && typeof window.Juego.cambiarPersonaje === 'function') {
      window.Juego.cambiarPersonaje(idx);
    }
    cerrarModalLogin();
  } else {
    // Si no ha iniciado, mostrar obligatoriamente el selector de personaje y nombre
    abrirModalLogin();
  }

  // Renderizar la Plaza en el panel derecho por defecto
  if (typeof mostrarPlazaEnPanel === 'function') {
    mostrarPlazaEnPanel();
  }

  // Renderizar el carrito en el panel izquierdo
  if (typeof mostrarCarrito === 'function') {
    mostrarCarrito();
  }
});
