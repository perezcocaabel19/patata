// ============================================================
// ARRANQUE DEL JUEGO Y GESTIÓN DE SESIÓN DE LA PLAZA DE ARMAS
// ============================================================

let personajeLoginSeleccionado = 0;

// ===============================
// SESION Y PANTALLA DE TITULO
// ===============================
function haySesion() {
  return Boolean(localStorage.getItem('clienteNombre'));
}

// Quita cualquier tecla que haya quedado presionada en el motor del juego
function detenerEntradaJuego() {
  ['w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'e', 'E', 'g', 'G',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].forEach(function (tecla) {
    window.dispatchEvent(new KeyboardEvent('keyup', { key: tecla }));
  });
  window.dispatchEvent(new Event('blur'));
}

function mostrarPantallaTitulo() {
  const titulo = document.getElementById('pantalla-titulo');
  if (titulo) {
    titulo.classList.remove('hidden');
  }
  cerrarModalLogin();
  detenerEntradaJuego();
}

function comenzarDesdeTitulo() {
  const titulo = document.getElementById('pantalla-titulo');
  if (titulo) {
    titulo.classList.add('hidden');
  }
  abrirModalLogin();
}

// Solo letras (con tildes y ñ), numeros y espacios, entre 2 y 12 caracteres
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ]{2,12}$/;

function nombreValido(nombre) {
  return PATRON_NOMBRE.test(nombre);
}

function mostrarErrorLogin(mensaje) {
  const error = document.getElementById('login-error');
  const input = document.getElementById('input-nombre');
  if (error) {
    error.textContent = mensaje;
    error.classList.remove('hidden');
  }
  if (input) {
    input.setAttribute('aria-invalid', 'true');
    input.focus();
  }
}

function ocultarErrorLogin() {
  const error = document.getElementById('login-error');
  const input = document.getElementById('input-nombre');
  if (error) {
    error.textContent = '';
    error.classList.add('hidden');
  }
  if (input) {
    input.removeAttribute('aria-invalid');
  }
}

// ===============================
// MODAL DE INICIO DE SESIÓN
// ===============================
function abrirModalLogin() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    ocultarErrorLogin();
    detenerEntradaJuego();
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
    const activo = i === personajeLoginSeleccionado;
    card.classList.toggle('activo', activo);
    card.setAttribute('aria-pressed', activo ? 'true' : 'false');
  });
}

function iniciarSesion(e) {
  if (e) e.preventDefault();

  const input = document.getElementById('input-nombre');
  const nombre = input ? input.value.trim() : '';

  if (!nombreValido(nombre)) {
    mostrarErrorLogin('Escribe entre 2 y 12 letras');
    return;
  }
  ocultarErrorLogin();

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
    // Se usa textContent para que el nombre no se interprete como HTML
    hudCliente.textContent = '';
    hudCliente.append('👤 ');
    const nombreNegrita = document.createElement('b');
    nombreNegrita.textContent = nombre;
    hudCliente.append(nombreNegrita, ' | 🎮 ');
    const personajeSpan = document.createElement('span');
    personajeSpan.textContent = charNombre;
    hudCliente.append(personajeSpan);
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
  // Bloquear el teclado del juego mientras el modal de login esta visible.
  // Se escucha en fase de captura para que juego.js no reciba las teclas.
  const modalLogin = document.getElementById('login-modal');
  if (modalLogin) {
    modalLogin.addEventListener('keydown', function (e) {
      if (modalLogin.classList.contains('hidden')) return;
      // Permitir escribir con normalidad en el campo del nombre
      if (e.target && e.target.id === 'input-nombre') return;
      e.stopPropagation();
    }, true);
    // Segunda barrera: si se escribe el nombre, la tecla ya llego al campo,
    // pero se corta antes de que juego.js la reciba en window
    modalLogin.addEventListener('keydown', function (e) {
      if (modalLogin.classList.contains('hidden')) return;
      if (e.target && e.target.id === 'input-nombre') e.stopPropagation();
    }, false);
  }

  // Pantalla de titulo: se comienza con clic o con cualquier tecla
  const pantallaTitulo = document.getElementById('pantalla-titulo');
  if (pantallaTitulo) {
    pantallaTitulo.addEventListener('click', comenzarDesdeTitulo);
  }
  window.addEventListener('keydown', function (e) {
    const titulo = document.getElementById('pantalla-titulo');
    if (!titulo || titulo.classList.contains('hidden')) return;
    e.preventDefault();
    e.stopPropagation();
    comenzarDesdeTitulo();
  }, true);

  const inputNombre = document.getElementById('input-nombre');
  if (inputNombre) {
    inputNombre.addEventListener('input', ocultarErrorLogin);
  }

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
    const titulo = document.getElementById('pantalla-titulo');
    if (titulo) {
      titulo.classList.add('hidden');
    }
  } else {
    // Sin sesion guardada se muestra la pantalla de titulo antes del login
    mostrarPantallaTitulo();
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
