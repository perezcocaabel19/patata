// ===============================
// CARRITO
// ===============================

let carrito = [];


// ===============================
// AGREGAR PRODUCTO
// ===============================

function agregarAlCarrito(id) {

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        return;
    }

    // Comprobar si el producto ya está en el carrito
    const productoCarrito = carrito.find(item => item.id === id);

    if (productoCarrito) {

        // Si ya existe, aumentar cantidad
        productoCarrito.cantidad++;

    } else {

        // Si no existe, agregarlo con cantidad 1
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    mostrarCarrito();
}


// ===============================
// MOSTRAR CARRITO
// ===============================

function mostrarCarrito() {

    const listaCarrito = document.getElementById("lista-carrito");

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p>El carrito está vacío.</p>
        `;

        calcularTotal();

        return;
    }


    carrito.forEach(producto => {

        const elemento = document.createElement("div");

        elemento.classList.add("item-carrito");

        elemento.innerHTML = `
            <div>
                <h3>${producto.nombre}</h3>

                <p>
                    Precio: S/ ${producto.precio.toFixed(2)}
                </p>

                <p>
                    Subtotal: 
                    S/ ${(producto.precio * producto.cantidad).toFixed(2)}
                </p>
            </div>

            <div>

                <button onclick="disminuirCantidad(${producto.id})">
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button onclick="aumentarCantidad(${producto.id})">
                    +
                </button>

                <button onclick="eliminarDelCarrito(${producto.id})">
                    Eliminar
                </button>

            </div>
        `;

        listaCarrito.appendChild(elemento);
    });


    calcularTotal();
}


// ===============================
// AUMENTAR CANTIDAD
// ===============================

function aumentarCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    if (!producto) {
        return;
    }

    producto.cantidad++;

    mostrarCarrito();
}


// ===============================
// DISMINUIR CANTIDAD
// ===============================

function disminuirCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    if (!producto) {
        return;
    }

    if (producto.cantidad > 1) {

        producto.cantidad--;

    } else {

        eliminarDelCarrito(id);

        return;
    }

    mostrarCarrito();
}


// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarDelCarrito(id) {

    carrito = carrito.filter(producto => producto.id !== id);

    mostrarCarrito();
}


// ===============================
// CALCULAR TOTAL
// ===============================

function calcularTotal() {

    const total = carrito.reduce(
        (suma, producto) =>
            suma + (producto.precio * producto.cantidad),
        0
    );

    document.getElementById("total").textContent =
        total.toFixed(2);
}