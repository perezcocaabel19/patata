// ============================================================
//  DATOS DEL JUEGO: CONFIGURACIÓN, PERSONAJES, TIENDAS Y CANJES
// ============================================================

const CONFIG = {
  // Velocidad del personaje, como fracción del ancho del mapa por segundo.
  velocidad: 0.22,

  // Alto del personaje respecto al alto del mapa (0.085 = 8.5%, escala proporcionada a la plaza).
  altoSprites: 0.085,

  // Velocidad de la animación de caminata (fotogramas por segundo).
  fpsAnimacion: 8,

  // Radio (fracción del ancho) para poder entrar a una tienda con la tecla E.
  radioTienda: 0.065,
};

// Personajes disponibles: P1 y P2 (ambos chicos)
const PERSONAJES = [
  {
    id: 'p1',
    nombre: 'P1 - Chico',
    tipo: 'Chico',
    descripcion: 'Personaje Chico 1',
    frames: [
      'assets/PERSONAJE/P1/01.png',
      'assets/PERSONAJE/P1/02.png',
      'assets/PERSONAJE/P1/03.png',
      'assets/PERSONAJE/P1/04.png',
      'assets/PERSONAJE/P1/05.png',
      'assets/PERSONAJE/P1/06.png',
      'assets/PERSONAJE/P1/07.png',
      'assets/PERSONAJE/P1/08.png',
      'assets/PERSONAJE/P1/09.png',
      'assets/PERSONAJE/P1/10.png',
    ],
  },
  {
    id: 'p2',
    nombre: 'P2 - Chico',
    tipo: 'Chico',
    descripcion: 'Personaje Chico 2',
    frames: [
      'assets/PERSONAJE/p2/01.png',
      'assets/PERSONAJE/p2/02.png',
      'assets/PERSONAJE/p2/03.png',
      'assets/PERSONAJE/p2/04.png',
      'assets/PERSONAJE/p2/05.png',
      'assets/PERSONAJE/p2/06.png',
      'assets/PERSONAJE/p2/07.png',
      'assets/PERSONAJE/p2/08.png',
      'assets/PERSONAJE/p2/09.png',
    ],
  },
];

// Tiendas de la Plaza de Armas de Huacho.
// x / y están en % del mapa (centro del establecimiento).
const TIENDAS = [
  {
    id: 'norkys',
    nombre: "Norky's",
    icono: '🍗',
    descripcion: 'Tradición y sabor en pollos a la brasa, carnes y parrillas.',
    x: 18.3,
    y: 31,
    productos: [
      { id: 101, nombre: '1 Pollo a la Brasa + Papas + Ensalada', categoria: 'Combos', precio: 55.00, desc: 'Pollo entero con papas doradas y ensalada fresca' },
      { id: 102, nombre: '1/2 Pollo a la Brasa + Papas', categoria: 'Combos', precio: 32.00, desc: 'Medio pollo a la leña con guarnición' },
      { id: 103, nombre: '1/4 Pollo a la Brasa + Papas', categoria: 'Combos', precio: 18.50, desc: 'Porción personal con salsas artesanales' },
      { id: 104, nombre: 'Porción de Anticuchos con Choclo', categoria: 'Parrillas', precio: 24.00, desc: 'Dos palos de corazón macerado a la parrilla' },
      { id: 105, nombre: 'Porción de Tequeños con Guacamole', categoria: 'Piques', precio: 16.00, desc: '8 tequeños rellenos de queso con crema de palta' },
      { id: 106, nombre: 'Papas Fritas Familiares', categoria: 'Guarnición', precio: 14.00, desc: 'Papas crocantes tipo bastón' },
      { id: 107, nombre: 'Jarra de Chicha Morada 1L', categoria: 'Bebidas', precio: 12.00, desc: 'Chicha natural con fruta picada y canela' },
      { id: 108, nombre: 'Gaseosa Inca Kola 1.5L', categoria: 'Bebidas', precio: 9.50, desc: 'La bebida del sabor nacional helada' },
    ],
  },
  {
    id: 'tambo',
    nombre: 'Tambo',
    icono: '🏪',
    descripcion: 'Tienda de conveniencia rápida: snacks, bebidas, comida lista y combos.',
    x: 7.38,
    y: 42.3,
    productos: [
      { id: 201, nombre: 'Empanada Mixta Jamón y Queso', categoria: 'Comida', precio: 6.50, desc: 'Masa hojaldrada recién horneada' },
      { id: 202, nombre: 'Empanada de Carne Tradicional', categoria: 'Comida', precio: 6.50, desc: 'Rellena de carne picada y pasas' },
      { id: 203, nombre: 'Sandwich Triple Pollo y Palta', categoria: 'Comida', precio: 7.50, desc: 'Pan de molde suave con pollo y palta' },
      { id: 204, nombre: 'Enrollado Hotdog con Queso', categoria: 'Comida', precio: 6.00, desc: 'Salchicha envuelta en masa crocante' },
      { id: 205, nombre: 'Bebida Energizante Volt 300ml', categoria: 'Bebidas', precio: 4.50, desc: 'Energía rápida para seguir caminando' },
      { id: 206, nombre: 'Cifrut Granadilla 500ml', categoria: 'Bebidas', precio: 2.50, desc: 'Bebida refrescante sabor granadilla' },
      { id: 207, nombre: 'Galletas Rellenas Chocomanía', categoria: 'Snacks', precio: 2.00, desc: 'Galletas de chocolate con crema' },
      { id: 208, nombre: 'Papas Lays Clásicas', categoria: 'Snacks', precio: 3.50, desc: 'Hojuelas de papa seleccionadas' },
      { id: 209, nombre: 'Helado Sin Parar D\'Onofrio', categoria: 'Helados', precio: 5.50, desc: 'Copa de helado con salsa de chocolate' },
      { id: 210, nombre: 'Agua San Mateo 600ml', categoria: 'Bebidas', precio: 2.50, desc: 'Agua mineral de manantial sin gas' },
    ],
  },
  {
    id: 'brujas',
    nombre: 'Brujas',
    icono: '🧪',
    descripcion: 'Restobar nocturno temático: Pociones (tragos y bebidas alcohólicas), Makis y Alitas.',
    x: 29.7,
    y: 18.3,
    productos: [
      // Pociones (Bebidas Alcohólicas)
      { id: 301, nombre: 'Poción Pisco Sour Huachano', categoria: 'Pociones (Bebidas)', precio: 22.00, desc: 'Trago emblemático con pisco quebranta y limón de Huacho' },
      { id: 302, nombre: 'Poción Chilcano Clásico', categoria: 'Pociones (Bebidas)', precio: 18.00, desc: 'Pisco, ginger ale, gotas de amargo y hielo' },
      { id: 303, nombre: 'Poción Mágica Sangre de Bruja', categoria: 'Pociones (Bebidas)', precio: 26.00, desc: 'Trago de la casa a base de ron, frutos rojos y licor flameado' },
      { id: 304, nombre: 'Poción Azul Mística', categoria: 'Pociones (Bebidas)', precio: 24.00, desc: 'Vodka premium con curacao azul y tónica' },
      { id: 305, nombre: 'Cerveza Artesanal Huachana', categoria: 'Pociones (Bebidas)', precio: 14.00, desc: 'Cerveza artesanal elaborada en el valle de Huacho' },
      { id: 306, nombre: 'Elixir de la Pasión', categoria: 'Pociones (Bebidas)', precio: 20.00, desc: 'Coctel dulce con maracuyá, gin y hierbabuena' },

      // Makis
      { id: 307, nombre: 'Tabla Maki Acevichado (10 cortes)', categoria: 'Makis', precio: 28.00, desc: 'Relleno de langostino furai y palta, bañado en salsa acevichada' },
      { id: 308, nombre: 'Tabla Maki Furai Crocante (10 cortes)', categoria: 'Makis', precio: 26.00, desc: 'Empanizado al panko con salmón, queso crema y palta' },
      { id: 309, nombre: 'Tabla Maki California Roll (10 cortes)', categoria: 'Makis', precio: 25.00, desc: 'Clásico con pulpa de cangrejo, palta y semillas de sésamo' },
      { id: 310, nombre: 'Tabla Maki Especial Brujas (10 cortes)', categoria: 'Makis', precio: 30.00, desc: 'Flameado con chimichurri nikkei, trucha y queso philadelphia' },
      { id: 311, nombre: 'Dúo de Makis Brujas (20 cortes surtidos)', categoria: 'Makis', precio: 50.00, desc: 'Elige dos tablas de tus makis favoritos con salsas' },

      // Alitas
      { id: 312, nombre: 'Alitas BBQ Huachanas (x6)', categoria: 'Alitas', precio: 22.00, desc: 'Bañadas en salsa barbacoa dulce ahumada' },
      { id: 313, nombre: 'Alitas Acevichadas (x6)', categoria: 'Alitas', precio: 24.00, desc: 'Crocantes con salsa acevichada y cebollita china' },
      { id: 314, nombre: 'Alitas Picantes Diabla (x6)', categoria: 'Alitas', precio: 23.00, desc: 'Picante intenso con salsa búfalo y ají limo' },
      { id: 315, nombre: 'Alitas Crispy con Papas Nativas (x8)', categoria: 'Alitas', precio: 28.00, desc: 'Alitas extra crocantes con papas de la sierra huachana' },
    ],
  },
  {
    id: 'chifa-beijing',
    nombre: 'Chifa Beijing',
    icono: '🥡',
    descripcion: 'Auténtica fusión peruano-china con los mejores woks de Huacho.',
    x: 93.1,
    y: 45.1,
    productos: [
      { id: 401, nombre: 'Arroz Chaufa Especial de Chancho y Pollo', categoria: 'Chaufas', precio: 24.00, desc: 'Salteado al wok con trozos de chancho asado y pollo' },
      { id: 402, nombre: 'Aeropuerto de Pollo Saltado', categoria: 'Chaufas', precio: 26.00, desc: 'Combinación de chaufa, tallarín frito, frejolito chino y huevo' },
      { id: 403, nombre: 'Docena de Wantán Frito', categoria: 'Entradas', precio: 14.00, desc: '12 wantanes crocantes rellenos con salsa de tamarindo' },
      { id: 404, nombre: 'Tallarín Saltado Chifa con Pollo', categoria: 'Tallarines', precio: 25.00, desc: 'Tallarines con verduras frescas, pollo y sillao' },
      { id: 405, nombre: 'Pollo Chi Jau Kay con Arroz', categoria: 'Especiales', precio: 27.00, desc: 'Filete de pollo arrebozado con salsa de ostión y cebolla china' },
      { id: 406, nombre: 'Pollo Ti Pa Kay Agridulce', categoria: 'Especiales', precio: 27.00, desc: 'Pechuga arrebozada bañada en salsa tamarindo con piña' },
      { id: 407, nombre: 'Sopa Wantán Especial Familiar', categoria: 'Sopas', precio: 20.00, desc: 'Caldo sustancioso con wantanes, chancho, langostinos y col' },
      { id: 408, nombre: 'Inka Kola Gordita 500ml', categoria: 'Bebidas', precio: 4.00, desc: 'Gaseosa de vidrio bien helada' },
    ],
  },
  {
    id: 'chifa-yoshi',
    nombre: 'Chifa Yoshi',
    icono: '🍜',
    descripcion: 'Maestría en sopas wantán, fideos saltados y platillos orientales tradicionales.',
    x: 8.9,
    y: 85.3,
    productos: [
      { id: 501, nombre: 'Sopa Fuchifú Especial de Pollo', categoria: 'Sopas', precio: 18.00, desc: 'Sopa espesa con huevo hilado, pollo tierno y verduras finas' },
      { id: 502, nombre: 'Kam Lu Wantán Tradicional', categoria: 'Especiales', precio: 29.00, desc: 'Wantanes crocantes con piña, durazno, carnes y salsa dulce' },
      { id: 503, nombre: 'Tallarín Saltado de Carne y Verduras', categoria: 'Tallarines', precio: 25.00, desc: 'Lomo fino saltado con tomate, cebolla y fideos al dente' },
      { id: 504, nombre: 'Chaufa de Mariscos Huachano', categoria: 'Chaufas', precio: 28.00, desc: 'Chaufa con mixtura de mariscos frescos del puerto de Huacho' },
      { id: 505, nombre: 'Wantán Sancochado Relleno (x8)', categoria: 'Entradas', precio: 16.00, desc: 'Wantanes al vapor rellenos de carne y langostino con sillao' },
      { id: 506, nombre: 'Pollo Limonkay Crocante', categoria: 'Especiales', precio: 26.00, desc: 'Pollo frito bañado en salsa cítrica de limón dulce' },
      { id: 507, nombre: 'Chancho con Tamarindo y Piña', categoria: 'Especiales', precio: 28.00, desc: 'Trozos de chancho crujiente con pimientos y fruta' },
      { id: 508, nombre: 'Gaseosa Inka Kola 1L', categoria: 'Bebidas', precio: 7.50, desc: 'Formato mediano para compartir' },
    ],
  },
  {
    id: 'compumark',
    nombre: 'Compumark',
    icono: '🎮',
    descripcion: 'La tienda gamer de Huacho: Videojuegos originales, accesorios y consolas.',
    x: 72.2,
    y: 96.7,
    productos: [
      { id: 1, nombre: 'Minecraft', categoria: 'Videojuegos', precio: 89.90, desc: 'Mundo abierto infinito de construcción y supervivencia' },
      { id: 2, nombre: 'Hollow Knight', categoria: 'Videojuegos', precio: 29.90, desc: 'Obra maestra de acción y plataformas en Hallownest' },
      { id: 3, nombre: 'GTA V', categoria: 'Videojuegos', precio: 59.90, desc: 'Acción y crimen en Los Santos con multijugador online' },
      { id: 4, nombre: 'The Last of Us', categoria: 'Videojuegos', precio: 79.90, desc: 'Aventura cinematográfica y dramática aclamada' },
      { id: 5, nombre: 'Ghost of Tsushima', categoria: 'Videojuegos', precio: 99.90, desc: 'Aventura de mundo abierto en el Japón feudal' },
      { id: 6, nombre: 'Red Dead Redemption 2', categoria: 'Videojuegos', precio: 89.90, desc: 'La cúspide de las historias del salvaje oeste americano' },
      { id: 7, nombre: 'Elden Ring', categoria: 'Videojuegos', precio: 119.90, desc: 'Juego del año RPG de acción en las Tierras Intermedias' },
      { id: 8, nombre: 'God of War Ragnarok', categoria: 'Videojuegos', precio: 129.90, desc: 'El viaje épico de Kratos y Atreus en los 9 reinos nórdicos' },
      { id: 9, nombre: 'Mouse Gamer RGB 6400 DPI', categoria: 'Accesorios', precio: 45.00, desc: 'Sensor óptico de alta precisión con luces personalizables' },
      { id: 10, nombre: 'Teclado Mecánico RGB Switch Blue', categoria: 'Accesorios', precio: 120.00, desc: 'Teclas táctiles sonoras y retroiluminación completa' },
      { id: 11, nombre: 'Headset Gamer con Micrófono 7.1', categoria: 'Accesorios', precio: 85.00, desc: 'Almohadillas acolchadas y sonido envolvente' },
      { id: 12, nombre: 'Mando Inalámbrico DualSense', categoria: 'Accesorios', precio: 249.90, desc: 'Gatillos adaptativos y respuesta háptica inmersiva' },
    ],
  },
];

// Canjes exclusivos que se pueden reclamar en la Plaza de Armas de Huacho usando puntos acumulados
const CANJES_PLAZA = [
  { id: 901, nombre: 'Helado Tradicional de Lúcuma', costoPuntos: 30, icono: '🍦', desc: 'Clásico helado artesanal huachano en la glorieta' },
  { id: 902, nombre: 'Postal de la Plaza de Armas', costoPuntos: 40, icono: '🖼️', desc: 'Recuerdo fotográfico oficial con marco conmemorativo' },
  { id: 903, nombre: 'Porción de Salchicha Huachana', costoPuntos: 60, icono: '🥓', desc: 'Salchicha típica ahumada empaquetada al vacío' },
  { id: 904, nombre: 'Gorra Bordada Huacho GO', costoPuntos: 100, icono: '🧢', desc: 'Gorra oficial de la aventura con visera curva' },
  { id: 905, nombre: 'Polo Conmemorativo Plaza de Huacho', costoPuntos: 150, icono: '👕', desc: 'Polo 100% algodón con diseño exclusivo' },
  { id: 906, nombre: 'Pase Turístico al Mirador de Huacho', costoPuntos: 200, icono: '🎟️', desc: 'Boleto VIP para recorrer el mirador de la bahía' },
];
