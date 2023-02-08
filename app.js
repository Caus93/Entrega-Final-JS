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

let carrito = [];
let productos = [];

productos.push(new Producto("0", "Blusa", 30000, "./imagenes/Camiseta1.jpeg"));
productos.push(new Producto("1", "Blusa", 50000, "./imagenes/Camiseta2.jpeg"));
productos.push(new Producto("2", "Blusa", 30000, "./imagenes/Pantalon.jpeg"));
productos.push(
  new Producto("3", "Pantalón", 60000, "./imagenes/Pantalon2.jpeg")
);

const contenedorProductos = document.getElementById("contenedorProductos");

window.addEventListener("load", loadProductos);

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
      let nuevoItem = new Producto(productoSeleccionado, 1);
      carrito.push(productoSeleccionado);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      agregarAlCarrito(nuevoItem);
    });
  }
}

const infoCarrito = document.getElementById("modalCar");

infoCarrito.addEventListener("click", agregarAlCarrito);

console.log(carrito);

function agregarAlCarrito(carrito) {
  modalBody.innerHTML = "";

  let subtotal = 0;
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((producto) => {
    const modalCar = document.createElement("div");
    modalCar.className = "modal-body";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.className = "card-image";

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const h4 = document.createElement("h4");
    h4.className = "name";
    h4.innerText = carrito.nombre;

    const p = document.createElement("p");
    p.className = "description";
    p.innerText = "$" + carrito.precio + " COP";

    img.appendChild(img);

    cardContent.appendChild(h4);
    cardContent.appendChild(p);

    modalCar.appendChild(cardContent);

    infoCarrito.appendChild(modalCar);
  });
}

function agregarAlModal(carrito) {
  /*   modalContent.innerHtml = ""; */

  carrito.foreach((carrito) => {
    const modalCar = document.createElement("div");
    modalCar.className = "modal-body";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.className = "card-image";

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const h4 = document.createElement("h4");
    h4.className = "name";
    h4.innerText = carrito.nombre;

    const p = document.createElement("p");
    p.className = "description";
    p.innerText = "$" + carrito.precio + " COP";

    img.appendChild(img);

    cardContent.appendChild(h4);
    cardContent.appendChild(p);

    modalCar.appendChild(cardContent);

    infoCarrito.appendChild(modalCar);
  });
}
