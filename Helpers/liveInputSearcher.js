//toma la data en vivo del searcher y filtra por las coincidencias
const tomarLiveInput = () => {
  let nombresTodosProductos = [];
  const searchBar = document.querySelector(".matchSearch");
  const loginButton = document.querySelector(".nav__menu-btn");

  fetch(`https://json-server-db2.onrender.com/productos`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) =>
        nombresTodosProductos.push({
          id: el.id,
          nombre: el.productName,
          img: el.img,
          categoria: el.categoria,
          descripcion: el.descripcion,
        })
      );
    });

  let inputSearchBar = document.getElementById("searchBar");
  let divSearchBarItems = document.createElement("div");

  divSearchBarItems.classList.add("divSearchBarItems");
  searchBar.appendChild(divSearchBarItems);

  inputSearchBar.addEventListener(
    "keydown",
    () => (divSearchBarItems.innerHTML = "")
  );

  inputSearchBar.addEventListener("blur", (e) => {
    e.target.value = "";
    inputSearchBar.style.width = "100%";
    setTimeout(() => {
      divSearchBarItems.innerHTML = "";
      loginButton.classList.remove("invisible");
      loginButton.classList.add("visible");
    }, 100);
  });

  inputSearchBar.addEventListener("focus", () => {
    inputSearchBar.value = "";
    inputSearchBar.style.width = "100%";

    loginButton.classList.remove("visible");
    loginButton.classList.add("invisible");
  });

  inputSearchBar.addEventListener("input", (e) => {
    nombresTodosProductos.map((el) => {
      let elMayus = el.nombre.toUpperCase();

      let inputValueMayus = e.target.value.toUpperCase();
      if (elMayus.includes(inputValueMayus) && e.target.value.length > 0) {
        divSearchBarItems.innerHTML += `<div class="item-searchBar" id="${el.id}" data-categoria="${el.categoria}">
          <div>
           <img src="${el.img}" alt="" width="40" height="40"/>
          </div>
           <div>
            <span>${el.nombre}</span>
           </div>
         </div>
        `;
        document.querySelectorAll(".item-searchBar").forEach((elem) =>
          elem.addEventListener("click", function clickeo(e) {

            // })
            window.location.href = `https://gu1m0.github.io/e-commerce/Pages/Productos/Vista-producto/vista_producto.html?id=${this.id}&categoria=${this.dataset.categoria}`; //this se usa acá para que tome todo el elemento el click, siosi en function() nombrada, no anonima xq con e.target solo trae el elemento, el this, es mas global
          })
        );

        console.log(`coincide con ${inputValueMayus}:` + elMayus);
      } else if (e.target.value == "") divSearchBarItems.innerHTML = "";
    });
  });
};
// let mediaQueryTablet = window.matchMedia("(max-width: 760px)");
function clickIconoBuscador() {
  const spanBuscar = document.querySelector(".nav__menu-search span");
  const inputBuscar = document.querySelector(".nav__menu-search input");
  const divBusqueda = document.querySelector(".matchSearch");

  spanBuscar.addEventListener("click", () => {
    inputBuscar.style.width = "100%";
    inputBuscar.focus();
  });
}

export const liveInput={
    tomarLiveInput,
    clickIconoBuscador

}