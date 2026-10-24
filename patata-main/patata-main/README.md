# Sistema de Ventas - Plaza de Armas de Huacho (Ventas GO)
> **Rama Principal: `main` (Proyecto Unificado y Optimizado)**

Sistema interactivo ambientado en la Plaza de Armas de Huacho con arquitectura de 3 columnas: Carrito de compras a la izquierda, Mapa 2D central de paseo y recreación, y Panel de Tiendas/Plaza dinámico a la derecha con sistema de acumulación y canje de puntos.

---

## 👥 Integrantes
- **Pacheco Manrique**
- **Lazlo**
- **Abel Perez**

---

## 🌟 Nuevas Características y Mejoras Implementadas

1. **📐 Layout de 3 Columnas**:
   - **Lado Izquierdo**: Carrito de compras permanente con cantidades (`+`, `−`, `✕`), subtotal, total en `S/`, cálculo de puntos a ganar y botón de pago.
   - **Centro**: Mapa 2D interactivo de la Plaza de Armas de Huacho con escala optimizada y puntos de interacción.
   - **Lado Derecho**:
     - *Modo Plaza (por defecto)*: Información del paseo, lista de establecimientos alrededor (sin revelar su inventario) y zona de canje de premios.
     - *Modo Tienda (al presionar `E`)*: Carga exclusivamente los productos del establecimiento donde se encuentra el jugador, con filtros y botón para agregar al carrito.

2. **⭐ Sistema de Puntos y Canjes de la Plaza de Armas**:
   - Cada compra en las tiendas acumula **1 punto por cada sol gastado**.
   - Los puntos acumulados se canjean directamente en la Plaza de Armas por premios huachanos exclusivos:
     - 🍦 Helado Tradicional de Lúcuma (30 pts)
     - 🖼️ Postal de la Plaza de Armas (40 pts)
     - 🥓 Porción de Salchicha Huachana (60 pts)
     - 🧢 Gorra Bordada Huacho GO (100 pts)
     - 👕 Polo Conmemorativo Plaza de Huacho (150 pts)
     - 🎟️ Pase Turístico al Mirador de Huacho (200 pts)

3. **🎮 Tienda Compumark Agregada**:
   - Ubicada en **X: 72.2% | Y: 96.7%**.
   - Venta de videojuegos (Minecraft, Hollow Knight, GTA V, The Last of Us, Ghost of Tsushima, Red Dead Redemption 2, Elden Ring, God of War Ragnarok) y accesorios gamer (Mando DualSense, Teclado Mecánico, Headset 7.1, Mouse RGB).

4. **🧪 Restobar Brujas Ampliado**:
   - **Pociones (Bebidas Alcohólicas)**: Pisco Sour Huachano, Chilcano Clásico, Poción Mágica Sangre de Bruja, Cerveza Artesanal Huachana, Poción Azul Mística, Elixir de la Pasión.
   - **Makis**: Tablas de 10 cortes (Acevichado, Furai Crocante, California Roll, Especial Brujas) y Dúo de Makis (20 cortes).
   - **Alitas**: BBQ Huachanas, Acevichadas, Picantes Diabla y Crispy con Papas Nativas.

5. **👤 Selección y Bloqueo de Personaje**:
   - **Se eliminó el Personaje 3**. Solo están disponibles **P1 (Chico)** y **P2 (Chica)**.
   - Al iniciar, el jugador elige su personaje y su nombre.
   - Se mantiene el mismo personaje durante toda la estadía (se deshabilitaron las teclas de cambio durante el juego). Para cambiar de avatar, se utiliza el botón **"Salir / Cambiar Personaje"**.

6. **📏 Tamaño de Personaje Proporcional**:
   - Reducido a más de la mitad (`CONFIG.altoSprites = 0.085`), adaptándose de forma realista a las calles, veredas y glorietas de la Plaza de Huacho.

---

## 🏪 Directorio de Establecimientos en la Plaza

| Establecimiento | Ubicación | Especialidad |
| :--- | :--- | :--- |
| **Norky's** | `X: 18.3% , Y: 31.0%` | Pollos a la brasa, combos familiares, anticuchos y tequeños |
| **Tambo** | `X: 7.38% , Y: 42.3%` | Tienda de conveniencia, empanadas, triples, bebidas y snacks |
| **Brujas** | `X: 29.7% , Y: 18.3%` | Restobar temático: Pociones (bebidas alcohólicas), Makis y Alitas |
| **Chifa Beijing** | `X: 93.1% , Y: 45.1%` | Chaufas al wok, aeropuertos, wantanes y pollo Chi Jau Kay |
| **Chifa Yoshi** | `X: 8.90% , Y: 85.3%` | Sopas wantán, fuchifú, Kam Lu Wantán y tallarines saltados |
| **Compumark** | `X: 72.2% , Y: 96.7%` | Videojuegos originales para PC/consolas y accesorios gamer |

---

## 🎮 Cómo Ejecutar la Aplicación

### Versión Web (Recomendada)
1. Haz doble clic en **`servidor.bat`** (o ejecuta `python servidor.py`).
2. Se abrirá automáticamente el navegador en:
   ```
   http://localhost:8000/index.html
   ```
3. Ingresa tu nombre, elige entre P1 (Chico) o P2 (Chica) e inicia tu recorrido.

### Versión Java Swing (Módulo de Escritorio)
- Ejecutar: Doble clic en **`ejecutar-java.bat`**.
- Recompilar: Doble clic en **`compilar-java.bat`**.

---

## ⌨️ Controles

| Control | Acción |
| :--- | :--- |
| **`W`, `A`, `S`, `D`** o **Flechas** | Caminar por la plaza |
| **`E`** o **Clic en establecimiento** | Ingresar al establecimiento y cargar sus productos a la derecha |
| **`G`** | Alternar la vista de zonas caminables (colisiones verdes) |
| **Botón "Salir / Cambiar Personaje"** | Abandonar la plaza y elegir un nuevo avatar |
