// ============================================================
//  Datos del juego: personajes, tiendas y ajustes
//  Edita este archivo para cambiar velocidades, tamanos o precios.
// ============================================================

const CONFIG = {
  // Velocidad del personaje, como fraccion del ancho del mapa por segundo.
  // 0.22 = cruza el mapa en ~4.5 segundos.
  velocidad: 0.22,

  // Alto del personaje respecto al alto del mapa (0.18 = 18%).
  altoSprites: 0.18,

  // Velocidad de la animacion de caminata (fotogramas por segundo).
  fpsAnimacion: 8,

  // Radio (fraccion del ancho) para poder entrar a una tienda con la tecla E.
  radioTienda: 0.06,
};

// Los 3 personajes. Cada uno usa sus 3 fotogramas de caminata.
const PERSONAJES = [
  {
    id: 'p1',
    nombre: 'P1',
    frames: [
      'assets/PERSONAJE/frames/p1-f1.png',
      'assets/PERSONAJE/frames/p1-f2.png',
      'assets/PERSONAJE/frames/p1-f3.png',
    ],
  },
  {
    id: 'p2',
    nombre: 'P2',
    frames: [
      'assets/PERSONAJE/frames/p2-f1.png',
      'assets/PERSONAJE/frames/p2-f2.png',
      'assets/PERSONAJE/frames/p2-f3.png',
    ],
  },
  {
    id: 'p3',
    nombre: 'P3',
    frames: [
      'assets/PERSONAJE/frames/p3-f1.png',
      'assets/PERSONAJE/frames/p3-f2.png',
      'assets/PERSONAJE/frames/p3-f3.png',
    ],
  },
];

// Tiendas del mapa. x / y estan en % del mapa (centro de la tienda).
const TIENDAS = [
  {
    nombre: "Norky's",
    x: 18.3,
    y: 31,
    productos: [{ nombre: 'Pollo a la brasa', precio: 50 }],
  },
  {
    nombre: 'Tambo',
    x: 7.38,
    y: 42.3,
    productos: [{ nombre: 'Empanada de pino', precio: 30 }],
  },
  {
    nombre: 'Brujas',
    x: 29.7,
    y: 18.3,
    productos: [{ nombre: 'Pocion curativa', precio: 45 }],
  },
  {
    nombre: 'Chifa Beijing',
    x: 93.1,
    y: 45.1,
    productos: [{ nombre: 'Arroz chaufa', precio: 25 }],
  },
  {
    nombre: 'Chifa Yoshi',
    x: 8.9,
    y: 85.3,
    productos: [{ nombre: 'Sopa de fideos', precio: 18 }],
  },
];
