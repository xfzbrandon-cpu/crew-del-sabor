/* =========================
   CONFIGURACIÓN
========================= */
let idiomaActual = localStorage.getItem("crewIdioma") || "es";
let carrito = [];
let numeroOrden =
    parseInt(localStorage.getItem("crewNumeroOrden")) || 1000;
const numeroWhatsApp = "14453058465";
/* =========================
   CAMBIO DE IDIOMA
========================= */
function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    localStorage.setItem("crewIdioma", idioma);
    document.querySelectorAll("[data-es][data-en]").forEach(elemento => {
        if (idioma === "en") {
            elemento.textContent =
                elemento.getAttribute("data-en");
        } else {
            elemento.textContent =
                elemento.getAttribute("data-es");
        }
    });
    document.documentElement.lang = idioma;
    actualizarTextosCarrito();
    actualizarCarrito();
}
/* =========================
   TEXTOS DEL CARRITO
========================= */
function actualizarTextosCarrito() {
    const titulo =
        document.querySelector("#carrito .carrito-header h2");
    const vaciar =
        document.querySelector(".vaciar-btn");
    const pedir =
        document.querySelector(".pedido-btn");
    if (titulo) {
        titulo.textContent =
            idiomaActual === "en"
                ? "🛒 Your order"
                : "🛒 Tu pedido";
    }
    if (vaciar) {
        vaciar.textContent =
            idiomaActual === "en"
                ? "🗑️ Empty cart"
                : "🗑️ Vaciar carrito";
    }
    if (pedir) {
        pedir.textContent =
            idiomaActual === "en"
                ? "📲 Order on WhatsApp"
                : "📲 Hacer pedido";
    }
}
/* =========================
   AGREGAR AL CARRITO
========================= */
function agregarAlCarrito(nombre, precio) {
    precio = Number(precio);
    const productoExistente =
        carrito.find(
            producto => producto.nombre === nombre
        );
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    actualizarCarrito();
    
}
/* =========================
   ACTUALIZAR CARRITO
========================= */
function actualizarCarrito() {
    const contenedor =
        document.getElementById("carrito-items");
    const contador =
        document.getElementById("contador-carrito");
    const totalElemento =
        document.getElementById("total-carrito");
    if (!contenedor || !contador || !totalElemento) {
        return;
    }
    contenedor.innerHTML = "";
    /* CARRITO VACÍO */
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="carrito-vacio">
                ${
                    idiomaActual === "en"
                        ? "Your cart is empty."
                        : "Tu carrito está vacío."
                }
            </p>
        `;
        contador.textContent = "0";
        totalElemento.textContent = "$0.00";
        return;
    }
    let total = 0;
    let cantidadTotal = 0;
    /* PRODUCTOS */
    carrito.forEach((producto, indice) => {
        const subtotal =
            producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += producto.cantidad;
        const item =
            document.createElement("div");
        item.className = "carrito-item";
        item.innerHTML = `
            <div class="carrito-item-info">
                <h4>
                    ${producto.nombre}
                </h4>
                <span>
                    $${producto.precio.toFixed(2)}
                </span>
            </div>
            <div class="cantidad-control">
                <button
                    type="button"
                    onclick="cambiarCantidad(${indice}, -1)"
                >
                    −
                </button>
                <span>
                    ${producto.cantidad}
                </span>
                <button
                    type="button"
                    onclick="cambiarCantidad(${indice}, 1)"
                >
                    +
                </button>
            </div>
            <strong class="subtotal">
                $${subtotal.toFixed(2)}
            </strong>
            <button
                type="button"
                class="eliminar-producto"
                onclick="eliminarProducto(${indice})"
                aria-label="Eliminar producto"
            >
                🗑️
            </button>
        `;
        contenedor.appendChild(item);
    });
    contador.textContent =
        cantidadTotal;
    totalElemento.textContent =
        `$${total.toFixed(2)}`;
}
/* =========================
   CAMBIAR CANTIDAD
========================= */
function cambiarCantidad(indice, cambio) {
    if (!carrito[indice]) {
        return;
    }
    carrito[indice].cantidad += cambio;
    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }
    actualizarCarrito();
}
/* =========================
   ELIMINAR PRODUCTO
========================= */
function eliminarProducto(indice) {
    if (!carrito[indice]) {
        return;
    }
    carrito.splice(indice, 1);
    actualizarCarrito();
}
/* =========================
   VACIAR CARRITO
========================= */
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}
/* =========================
   ABRIR CARRITO
========================= */
function abrirCarrito() {
    const carritoElemento =
        document.getElementById("carrito");
    const overlay =
        document.getElementById("carrito-overlay");
    if (!carritoElemento || !overlay) {
        return;
    }
    carritoElemento.classList.add("activo");
    overlay.classList.add("activo");
    document.body.classList.add("carrito-abierto");
}
/* =========================
   CERRAR CARRITO
========================= */
function cerrarCarrito() {
    const carritoElemento =
        document.getElementById("carrito");
    const overlay =
        document.getElementById("carrito-overlay");
    if (!carritoElemento || !overlay) {
        return;
    }
    carritoElemento.classList.remove("activo");
    overlay.classList.remove("activo");
    document.body.classList.remove("carrito-abierto");
}
/* =========================
   PEDIDO POR WHATSAPP
========================= */
function hacerPedidoWhatsApp() {
    /* COMPROBAR CARRITO */
    if (carrito.length === 0) {
        alert(
            idiomaActual === "en"
                ? "Your cart is empty."
                : "Tu carrito está vacío."
        );
        return;
    }
    /* PEDIR NOMBRE */
    const nombreCliente =
        prompt(
            idiomaActual === "en"
                ? "Enter your name:"
                : "Escribe tu nombre:"
        );
    if (
        !nombreCliente ||
        nombreCliente.trim() === ""
    ) {
        alert(
            idiomaActual === "en"
                ? "Please enter your name."
                : "Por favor escribe tu nombre."
        );
        return;
    }
    /* NÚMERO DE ORDEN */
    numeroOrden++;
    localStorage.setItem(
        "crewNumeroOrden",
        numeroOrden
    );
    /* CREAR MENSAJE */
    let mensaje =
        "🍔 *CREW DEL SABOR*\n\n";
    if (idiomaActual === "en") {
        mensaje +=
            `🔢 *Order:* #${numeroOrden}\n`;
        mensaje +=
            `👤 *Customer:* ${nombreCliente.trim()}\n\n`;
        mensaje +=
            "🛒 *ORDER:*\n";
    } else {
        mensaje +=
            `🔢 *Orden:* #${numeroOrden}\n`;
        mensaje +=
            `👤 *Cliente:* ${nombreCliente.trim()}\n\n`;
        mensaje +=
            "🛒 *PEDIDO:*\n";
    }
    /* PRODUCTOS */
    let total = 0;
    carrito.forEach(producto => {
        const subtotal =
            producto.precio * producto.cantidad;
        total += subtotal;
        mensaje +=
            `• ${producto.cantidad}x ${producto.nombre} - $${subtotal.toFixed(2)}\n`;
    });
    /* TOTAL */
    mensaje += "\n";
    mensaje +=
        `💰 *TOTAL: $${total.toFixed(2)}*\n\n`;
    /* DESPEDIDA */
    mensaje +=
        idiomaActual === "en"
            ? "Thank you for your order! 🙌"
            : "¡Gracias por tu pedido! 🙌";
    /* ABRIR WHATSAPP */
    const enlaceWhatsApp =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje);
    window.open(
        enlaceWhatsApp,
        "_blank"
    );
    /* LIMPIAR CARRITO */
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
}
/* =========================
   INICIAR PÁGINA
========================= */
document.addEventListener(
    "DOMContentLoaded",
    function() {
        cambiarIdioma(idiomaActual);
        actualizarCarrito();
        actualizarTextosCarrito();
    }
);