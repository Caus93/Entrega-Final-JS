/* Swipper (Carrusel) */

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerslide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

/* Arrays */
let carrito = [];
let productos = [];

const cargarProductos = async () => {
  const response = await fetch("productos.json");
  const data = await response.json();
  for (let producto of data) {
    let productoNuevo = new Producto(
      producto.id,
      producto.nombre,
      producto.precio,
      producto.imagen
    );
    productos.push(productoNuevo);
  }
};

/* Productos */

/* productos.push(new Producto("0", "Blusa", 30000, "./imagenes/Camiseta1.jpeg"));
productos.push(new Producto("1", "Blusa", 50000, "./imagenes/Camiseta2.jpeg"));
productos.push(new Producto("2", "Blusa", 30000, "./imagenes/Camiseta3.jpeg"));
productos.push(
  new Producto("3", "Pantalón", 60000, "./imagenes/Pantalon.jpeg")
); */

/* Elementos Traidos del DOM */

const contenedorProductos = document.getElementById("contenedorProductos");
const modalBody = document.getElementById("modalCar");
const precioTotal = document.getElementById("precioTotal");
const loaderTexto = document.getElementById("loaderTexto");
const loader = document.getElementById("loader");
const botonFinalizarCompra = document.getElementById("botonFinalizarCompra");

/* Load Productos */

setTimeout(() => {
  loaderTexto.remove();
  loader.remove();
  loadProductos();
}, 2000);

/* Escuchadores (eventos) */

window.addEventListener("load", cargarProductos);

modalBody.addEventListener("click", agregarAlCarrito(carrito));
botonFinalizarCompra.addEventListener("click", () => {
  finalizarCompra(carrito);
});

/* Funciones */

function loadProductos() {
  productos.forEach((producto) => {
    const divSwiper = document.createElement("div");
    divSwiper.className = "card swiper-slide";

    const divImage = document.createElement("div");
    divImage.className = "image-content";

    const spanOverlay = document.createElement("span");
    spanOverlay.className = "overlay";

    const divCardImg = document.createElement("div");
    divCardImg.className = "card-image";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.className = "card-img";

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const h4 = document.createElement("h4");
    h4.className = "name";
    h4.innerText = producto.nombre;

    const p = document.createElement("p");
    p.className = "description";
    p.innerText = "$" + producto.precio + " COP";

    const btnAgregar = document.createElement("button");
    btnAgregar.className = "button";
    btnAgregar.id = producto.id;
    btnAgregar.innerText = "Agregar";

    divCardImg.appendChild(img);

    cardContent.appendChild(h4);
    cardContent.appendChild(p);
    cardContent.appendChild(btnAgregar);

    divImage.appendChild(spanOverlay);
    divImage.appendChild(divCardImg);

    divSwiper.appendChild(divImage);
    divSwiper.appendChild(cardContent);

    contenedorProductos.appendChild(divSwiper);
  });

  let btnCarrito = document.querySelectorAll(".button");
  for (btn of btnCarrito) {
    btn.addEventListener("click", function () {
      let productoSeleccionado = productos[this.id];
      carrito.push(productoSeleccionado);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      agregarAlCarrito(carrito);

      Swal.fire({
        title: "Ha agregado un producto al carrito",
        text: "Estás a punto de llevar la mejor ropa contigo!",
        icon: "success",
        confirmButtonColor: "warning",
        confirmButtonText: "Gracias!",
        timer: 3000,
      });
    });
  }
  agregarAlCarrito(carrito);
}

//cargar el carrito si es que hay algo
localStorage.getItem("carrito")
  ? (carrito = JSON.parse(localStorage.getItem("carrito")))
  : ((carrito = []), localStorage.setItem("carrito", JSON.stringify(carrito)));

function agregarAlCarrito(array) {
  modalBody.innerHTML = "";

  let subtotal = 0;
  let total = 0;
  let cantidadTotal = 0;

  array.forEach((productoCarrito) => {
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.setAttribute("id", `productoCarrito${productoCarrito.id}`);

    const img = document.createElement("img");
    img.src = productoCarrito.imagen;
    img.className = "card-image";

    const h4 = document.createElement("h4");
    h4.className = "name";
    h4.innerText = productoCarrito.nombre;

    const p = document.createElement("p");
    p.className = "description";
    p.innerText = "$" + productoCarrito.precio + " COP";

    let botonE = document.createElement("i");
    botonE.classList.add("fa-solid", "fa-trash");
    botonE.setAttribute(`id`, `btnEliminar${productoCarrito.id}`);

    cardContent.appendChild(img);

    cardContent.appendChild(h4);
    cardContent.appendChild(p);
    cardContent.appendChild(botonE);

    modalBody.appendChild(cardContent);
  });

  array.forEach((productoCarrito) =>
    document
      .getElementById(`btnEliminar${productoCarrito.id}`)
      .addEventListener("click", () => {
        let cardContent = document.getElementById(
          `productoCarrito${productoCarrito.id}`
        );
        cardContent.parentNode.removeChild(cardContent);

        let indice = array.indexOf(productoCarrito);
        array.splice(indice, 1);

        localStorage.setItem("carrito", JSON.stringify(array));

        Swal.fire({
          title: "Eliminaste un producto del carrito",
          text: "Vuelve pronto para que nos lleves contigo!",
          icon: "error",
          confirmButtonColor: "warning",
          confirmButtonText: "Gracias!",
          timer: 3000,
        });
        calcularTotal(array);
      })
  );
  calcularTotal(array);
}

function calcularTotal(array) {
  let total = array.reduce(
    (acc, productoCarrito) => acc + productoCarrito.precio,
    0
  );
  total == 0
    ? (precioTotal.innerHTML = `No hay productos en el carrito</strong>`)
    : (precioTotal.innerHTML = `El total es: <strong>${total}</strong>`);
}

function finalizarCompra(array) {
  Swal.fire({
    title: "Está seguro de realizar la compra",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
    confirmButtonColor: "green",
    cancelButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Compra realizada",
        icon: "success",
        confirmButtonColor: "green",
        text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
      });
      //resetear carrito
      carrito = [];
      //removemos storage
      localStorage.setItem("carrito", []);
      agregarAlCarrito(carrito);
    } else {
      Swal.fire({
        title: "Compra no realizada",
        icon: "info",
        text: `La compra no ha sido realizada! Sus productos siguen en el carrito :D`,
        confirmButtonColor: "green",
        timer: 3500,
      });
    }
  });
}
