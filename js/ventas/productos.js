const productos = [
    {
        id: 1,
        nombre: "Minecraft",
        categoria: "Videojuego",
        precio: 89.90,
        imagen: "assets/productos/minecraft.jpg"
    },
    {
        id: 2,
        nombre: "Hollow Knight",
        categoria: "Videojuego",
        precio: 29.90,
        imagen: "assets/productos/hollow-knight.jpg"
    },
    {
        id: 3,
        nombre: "GTA V",
        categoria: "Videojuego",
        precio: 59.90,
        imagen: "assets/productos/gta-v.jpg"
    },
    {
        id: 4,
        nombre: "The Last of Us",
        categoria: "Videojuego",
        precio: 79.90,
        imagen: "assets/productos/the-last-of-us.jpg"
    },
    {
        id: 5,
        nombre: "Ghost of Tsushima",
        categoria: "Videojuego",
        precio: 99.90,
        imagen: "assets/productos/ghost-of-tsushima.jpg"
    },
    {
        id: 6,
        nombre: "Red Dead Redemption 2",
        categoria: "Videojuego",
        precio: 89.90,
        imagen: "assets/productos/red-dead-redemption-2.jpg"
    }
];


// ===============================
// MOSTRAR CATÁLOGO
// ===============================

const catalogo = document.getElementById("catalogo");

productos.forEach(producto => {

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
        <div class="producto-imagen">
            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
                onerror="this.style.display='none'"
            >
        </div>

        <div class="producto-info">
            <h3>${producto.nombre}</h3>

            <p class="categoria">
                ${producto.categoria}
            </p>

            <p class="precio">
                S/ ${producto.precio.toFixed(2)}
            </p>

            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        </div>
    `;

    catalogo.appendChild(tarjeta);
});