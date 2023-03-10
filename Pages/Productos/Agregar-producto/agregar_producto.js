import { liveInput } from "../../../Helpers/liveInputSearcher.js";

liveInput.tomarLiveInput();
liveInput.clickIconoBuscador();

const botonAgregarProd = document.querySelector("[data-boton-form]");

//agregar Producto -- POST method
const crearProducto = () => {
  let nombre = document.querySelector("[data-producto-name]").value;
  let apellido = document.querySelector("[data-producto-ape]").value;
  let edad = document.querySelector("[data-producto-precio]").value;
  let correo = document.querySelector("[data-producto-correo]").value;
  let fotoPerfil = document.querySelector("[data-producto-url]").value;
  let categoria = document.querySelector("[data-select-seccion]").value;
  let descripcion = document.querySelector("[data-producto-descripcion]").value;
  let password = document.querySelector("[data-producto-pass]").value;
  let rol = document.querySelector("[data-producto-rol]").value;
  let id = crearID(20);

  fetch(`https://json-server-db4.onrender.com/users?categoria=${categoria}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      nombre,
      apellido,
      edad,
      correo,
      fotoPerfil,
      password,
      rol,
      descripcion,
      categoria
    }),
  });
};

//helper para randomID
const crearID = (longitud) => {
  let contenidoPosible = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let hash = [];
  for (let i = 0; i < longitud; i++) {
    let numRandom = Math.floor(
      (Math.random() * contenidoPosible.length * 20) / 20
    );
    // console.log(numRandom);
    const element = contenidoPosible[numRandom];
    hash.push(element);
  }
  hash = hash.join("");

  return hash;
};
//----------------------------------------------------------------------------------------------------------

//tomar URL con el id y seccion + fetch(URL)
const tomarIDUrl = () => {
  const urlConID = new URL(window.location);
  let idParam = urlConID.searchParams.get("id");
  return idParam;
};
const tomarSeccionUrl = () => {
  const urlConID = new URL(window.location);
  let seccion = urlConID.searchParams.get("seccion");
  return seccion;
};

//llena la data de los inputs tomando el ID con Json para editar producto
const llenaDataInput = () => {
  fetch(`https://json-server-db4.onrender.com/users/${tomarIDUrl()}`)
    .then((res) => res.json())
    .then((data) => {
      let nombre = document.querySelector("[data-producto-name]");
      let edad = document.querySelector("[data-producto-precio]");
      let apellido = document.querySelector("[data-producto-ape]");
      let correo = document.querySelector("[data-producto-correo]");
      let fotoPerfil = document.querySelector("[data-producto-url]");
      let categoria = document.querySelector("[data-select-seccion]");
      let descripcion = document.querySelector("[data-producto-descripcion]");
      let password = document.querySelector("[data-producto-pass]")
      let rol = document.querySelector("[data-producto-rol]")
      // categoria.setAttribute("disabled", "true"); //deshabilita boton select category
      categoria.value = tomarSeccionUrl();
      nombre.value = data.nombre;
      apellido.value = data.apellido;
      edad.value = data.edad;
      correo.value = data.correo;
      password.value = data.password;
      rol.value = data.rol;
      fotoPerfil.value = data.fotoPerfil;
      descripcion.value = data.descripcion;
    });
};

//Update data --- PUT method
const udpateJson = () => {
  let nombre = document.querySelector("[data-producto-name]").value;
  let apellido = document.querySelector("[data-producto-ape]").value;
  let edad = document.querySelector("[data-producto-precio]").value;
  let correo = document.querySelector("[data-producto-correo]").value;
  let fotoPerfil = document.querySelector("[data-producto-url]").value;
  let categoria = document.querySelector("[data-select-seccion]").value;
  let descripcion = document.querySelector("[data-producto-descripcion]").value;
  let password = document.querySelector("[data-producto-pass]").value;
  let rol = document.querySelector("[data-producto-rol]").value;

  fetch(`https://json-server-db4.onrender.com/users/${tomarIDUrl()}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      apellido,
      edad,
      correo,
      fotoPerfil,
      password,
      rol,
      descripcion,
      categoria
    }),
  });
};

if (window.location.href.includes("id=")) {
  //-si viene "id=" en params que el boton updatee producto, no cree
  llenaDataInput();
  const botonForm = document.querySelector("[data-boton-form]");
  botonForm.addEventListener("click", () => {
    udpateJson();
    swal("Usuario actualizado", "", "success");
    setTimeout(() => {
      window.location.href = "../Editar-producto/editar_producto.html";
    }, 2500);
  });
} else {
  //-sino que cree un producto Nuevo en clck button
  botonAgregarProd.addEventListener("click", (e) => {
    // let nombre = document.querySelector("[data-producto-name]").value;
    // let apellido = document.querySelector("[data-producto-ape]").value;
    // let edad = document.querySelector("[data-producto-precio]").value;
    // let fotoPerfil = document.querySelector("[data-producto-url]").value;
    // let correo = document.querySelector("[data-producto-correo]").value;

    if (
      nombre != "" &&
      edad != "" &&
      fotoPerfil != "" &&
      apellido != "" &&
      correo != ""&&
      password != ""&&
      rol != ""
    ) {
      setTimeout(() => {
        crearProducto();
      }, 1500);
      swal("Usuario agregado correctamente", "", "success");
    } else
      swal(
        "Usuario no agregado",
        "Debes rellenar los campos faltantes",
        "error"
      );
  });
}
