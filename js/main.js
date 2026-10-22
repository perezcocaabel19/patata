// ============================================================
//  Arranque del juego
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // Los botones invisibles sobre las tiendas abren su modal.
  document.querySelectorAll('.shop-trigger').forEach(function (boton) {
    boton.addEventListener('click', function () {
      Juego.abrirTienda(boton.title);
    });
  });

  Juego.iniciar();
});
