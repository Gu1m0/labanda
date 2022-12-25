import { liveInput } from "../../../Helpers/liveInputSearcher.js";

liveInput.tomarLiveInput();
liveInput.clickIconoBuscador();

//se cargan las cards de la db
const cardsContainer = document.querySelectorAll(".cards-container");
cardsContainer.forEach((categoria) => {
  fetch(
    `https://json-server-db4.onrender.com/users?categoria=${categoria.id}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((el) => {
        let card = `
      <div class="card" id='${el.id}'>
      <div class="editors">
      <span class="trasher"><i class="fa-solid fa-trash-can"></i></span>
      <span class="pen"><i class="fa-solid fa-pen"></i></span>
      </div>
      <div class="img-name">
      <div class="card-img">
      <img src="${el.fotoPerfil}" />
      </div>
      <p class="p-productName">${el.nombre} ${el.apellido}</p>
      </div>
      <div class="precio-link">
      <p class="p-precio">Edad: ${el.edad}</p>
      </div>
      </div>
        `;

        categoria.innerHTML += card;
      });
    });
});
//timeout para que funcione el "editar producto (lápiz)" despues de que carguen las cards de la db
setTimeout(() => {
  const pencil = document.querySelectorAll(".pen i");
  pencil.forEach((el) => {
    el.addEventListener("click", () => {
      let id = el.parentNode.parentNode.parentNode.id;
      let seccion = el.parentNode.parentNode.parentNode.parentNode.id;
      window.location.href = `../Agregar-producto/agregar_producto.html?id=${id}&seccion=${seccion}`;

    });
  });
  //al hacer click en el basurero, va eliminar la card actual + un fetch DELETE de la db
  const trasher = document.querySelectorAll(".trasher i");
  trasher.forEach((element) =>
    element.addEventListener("click", (e) => {
      let msjEmerg = document.createElement("div");
      let cardToDelete = e.target.parentNode.parentNode.parentNode;
      msjEmerg.classList.add("divEmerg");

      msjEmerg.innerHTML = `
      <div class="alertaDel">
         <span>¿Eliminar producto?</span>
         <button class="btn-accept">Aceptar</button>
         <button class="btn-cancel">Cancelar</button>
       </div>`;
      cardToDelete.appendChild(msjEmerg);

      const btn_Aceptar = document.querySelectorAll(".btn-accept");
      btn_Aceptar.forEach((el) => {
        const cardsContainer = document.querySelectorAll(".cards-container"); //cambiar esto por parentNode.id  asi no recorrer todas las secciones (Ver)----------------------------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        el.addEventListener("click", () => {
          cardsContainer.forEach((categoria) => {
            fetch(
              `https://json-server-db4.onrender.com/users/${cardToDelete.id}`,
              {
                method: "DELETE",
              }
            ).then(() => {
              msjEmerg.remove();
              cardToDelete.style.animation =
                "shake2 .5s 1 linear,opacity2 .5s 1 .5s linear";
              setTimeout(() => {
                cardToDelete.remove();
                let modal = document.querySelector(".swal-overlay");
                modal.classList.remove("swal-overlay--show-modal");
              }, 2000);
              swal("Usuario eliminado con Éxito", "", "success");
            });
          });
        });

        const btn_Cancelar = document.querySelectorAll(".btn-cancel");
        btn_Cancelar.forEach((el) =>
          el.addEventListener("click", () => msjEmerg.remove())
        );
      });
    })
  );
}, 1500);
