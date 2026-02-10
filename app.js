// variables globales 
let usuarios = {
    admin:"admin123",
    usuario : "123",
    demo : "demo" 
}

let usuarioActual = null;

// inicio de la app
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp(){
    // verificar si hay un usuario logeado 
    let userLogged = localStorage.getItem("usuarioLogueado");
    if (userLogged) {
        usuarioActual = JSON.parse(usuarioActual);
        mostrarDashboard();
    }

}

function login(e) {
    e.preventDefault();
    let user = document.querySelector("#inputUser").value;
    let password = document.querySelector("#inputPassword").value;

    if (usuarios[user] && usuarios[user] == password) {
        usuarioActual = user;
        localStorage.setItem("usuarioLogueado" , JSON.stringify(user));
        mostrarDashboard();
        document.querySelector("#formLogin").reset()
    }else {
        console.log("usuario incorrecto ")
    }
}

function mostrarDashboard(){
    document.querySelector("#loginSection").style.display = "none"; 
    document.querySelector("#btnLogin").style.display = "none"; 
    
    document.querySelector("#mainContent").style.display ="block";
}


