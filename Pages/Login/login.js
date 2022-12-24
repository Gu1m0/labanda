import { liveInput } from "../../Helpers/liveInputSearcher.js";

liveInput.tomarLiveInput();
liveInput.clickIconoBuscador();

const botonForm = document.querySelector(".buttonForm");

botonForm.addEventListener("click", (e) => {
  const correoInput = document.querySelector(".correoInput").value;
  const passwordInput = document.querySelector(".passwordInput").value;

  fetch(
    `https://json-server-db3.onrender.com/users?correo=${correoInput}&password=${passwordInput}`
  )
    .then((res) => res.json())
    .then((data) =>
      data.forEach((element) => {
        let mail = element.correo;
        let pass = element.password;
        let rol = element.rol;
        if (correoInput == mail && passwordInput == pass && rol == "admin") {
          swal("Usuario Correcto!", "=ADMIN=", "success")
          .then(() =>{
            window.location.href ="../Productos/Editar-producto/editar_producto.html"
          })
          
        }else if (correoInput == mail && passwordInput == pass && rol == "user"){
          swal("Usuario Correcto",`Bienvenido, ${element.nombre}`, "success");
          
        }
      })
    );
});
