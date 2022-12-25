import { liveInput } from "../../../Helpers/liveInputSearcher.js";

liveInput.tomarLiveInput();
liveInput.clickIconoBuscador();

let cardsContainer = document.querySelectorAll(".cards-container");

const pageLeft = document.querySelectorAll(".pageLeft");
const pageRight = document.querySelectorAll(".pageRight");
const i = document.querySelectorAll(".productos span.pageLeft");

//botones para IZQ y derecha en cards-container
pageLeft.forEach((el, key, array) => {
  if (key == 0) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft - cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  } else if (key == 1) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft - cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  } else if (key == 2) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft - cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  }
});

pageRight.forEach((el, key, array) => {
  if (key == 0) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft + cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  } else if (key == 1) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft + cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  } else if (key == 2) {
    el.addEventListener("click", () => {
      cardsContainer[key].scrollTo(
        cardsContainer[key].scrollLeft + cardsContainer[key].clientWidth,
        0
      );
      setTimeout(() => {
        array[key].classList.add("pageAnimate");
      }, 10);
      array[key].classList.remove("pageAnimate");
    });
  }
});
// ---------------------------------------------------------------------------------------------------------
//se repite de Agregar producto
const tomarIDUrl = () => {
  const urlConID = new URL(window.location);
  let idParam = urlConID.searchParams.get("id");
  return idParam;
};

//se repite de Agregar producto
const tomarSeccionUrl = () => {
  const urlConID = new URL(window.location);
  let seccion = urlConID.searchParams.get("categoria");
  return seccion;
};

const vistaProducto = document.querySelector(".vista-prod");

//toma la data de la URL y con fetch trae el producto y rellena
fetch(`https://json-server-db3.onrender.com/users/${tomarIDUrl()}`)
  .then((res) => res.json())
  .then(
    (data) =>
      (vistaProducto.innerHTML = `
    <div class="producto-indiv">
          <div class="producto-indiv__img">
            <img src="${data.fotoPerfil}" alt="img-producto" />
          </div>
          <div class="producto-indiv__texto">
            <h1>${data.nombre}, ${data.apellido}</h1>
            <p>Edad: ${data.edad}</p>
            <p>Correo: ${data.correo}</p>
            <p>Categoría: ${data.categoria}</p>
            <p>Descripción:
            ${data.descripcion}
            </p>
          </div>
        </div>
    `)
  );
//llena la data relacionada a la seccion en "productos relacionados"
let cardsContainer2 = document.querySelector(".cards-container");
fetch(`https://json-server-db3.onrender.com/users?categoria=${tomarSeccionUrl()}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((el) => {

      cardsContainer2.innerHTML += `
      <div class="card" id='${el.id}'>
      <div class="img-name">
       <div class="card-img">
        <img src="${el.fotoPerfil}" />
       </div>
      <p class="p-productName">${el.nombre} ${el.apellido}</p>
       </div>
      <div class="precio-link">
        <p class="p-precio">Edad: ${el.edad}</p>
        <a>Ver usuario</a>
      </div>
   </div>
    `;})

    document.querySelectorAll("a").forEach((elem) =>
      elem.addEventListener("click", function clickeo(e) {
        let categoriaProd = tomarSeccionUrl();
        let idProd = e.target.closest(".card").id;

        window.location.href = `./vista_producto.html?id=${idProd}&categoria=${categoriaProd}`;//this se usa acá para que tome todo el elemento el click, siosi en function() nombrada, no anonima xq con e.target solo trae el elemento, el this, es mas global
      })
    );
    });


      