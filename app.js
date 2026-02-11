// Variables globales
let usuarioActual = null;


// Inicializar usuarios por defecto en localStorage
function inicializarUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuariosApp");
    if (!usuariosGuardados) {
        const usuariosPorDefecto = {
            admin: "admin123",
            usuario: "1234",
            demo: "demo"
        };
        localStorage.setItem("usuariosApp", JSON.stringify(usuariosPorDefecto));
    }
}

// Obtener todos los usuarios registrados
function obtenerUsuarios() {
    const usuarios = localStorage.getItem("usuariosApp");
    return usuarios ? JSON.parse(usuarios) : {};
}

// Validar que usuario y contraseña no estén vacíos
function validarCamposLogin(usuario, password) {
    if (!usuario.trim()) {
        return { valido: false, mensaje: "El usuario no puede estar vacío" };
    }
    if (!password.trim()) {
        return { valido: false, mensaje: "La contraseña no puede estar vacía" };
    }
    return { valido: true, mensaje: "" };
}

// Validar credenciales contra localStorage
function validarCredenciales(usuario, password) {
    const usuarios = obtenerUsuarios();
    
    if (!usuarios[usuario]) {
        return { valido: false, mensaje: "Usuario no encontrado" };
    }
    if (usuarios[usuario] !== password) {
        return { valido: false, mensaje: "Contraseña incorrecta" };
    }
    return { valido: true, mensaje: "Login exitoso" };
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    inicializarUsuarios();
    initApp();
    
    const formLogin = document.querySelector("#formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", login);
    }
    
    const btnLogout = document.querySelector("#btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", logout);
    }
});

function initApp(){
    // Verificar si hay usuario logeado en localStorage
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
        usuarioActual = usuarioGuardado;
        mostrarDashboard();
    }
}

function login(e) {
    e.preventDefault();
    
    const usuario = document.querySelector("#inputUser").value;
    const password = document.querySelector("#inputPassword").value;
    
    // Validar campos vacíos
    const validacionCampos = validarCamposLogin(usuario, password);
    if (!validacionCampos.valido) {
        alert(validacionCampos.mensaje);
        return;
    }
    
    // Validar credenciales
    const validacionCredenciales = validarCredenciales(usuario, password);
    if (!validacionCredenciales.valido) {
        alert(validacionCredenciales.mensaje);
        return;
    }
    
    // Login exitoso
    usuarioActual = usuario;
    localStorage.setItem("usuarioLogueado", usuario);
    mostrarDashboard();
    document.querySelector("#formLogin").reset();
}

function mostrarDashboard(){
    document.querySelector("#loginSection").style.display = "none"; 
    document.querySelector("#btnLogin").style.display = "none"; 
    document.querySelector("#btnLogout").style.display = "block";
    document.querySelector("#btnAgregar").style.display = "block";
    
    document.querySelector("#mainContent").style.display = "block";
}

function logout() {
    localStorage.removeItem("usuarioLogueado");
    usuarioActual = null;
    
    document.querySelector("#loginSection").style.display = "block"; 
    document.querySelector("#btnLogin").style.display = "block"; 
    document.querySelector("#btnLogout").style.display = "none";
    document.querySelector("#btnAgregar").style.display = "none";
    
    document.querySelector("#mainContent").style.display = "none";
    document.querySelector("#formLogin").reset();
    document.querySelector("#formPelicula").reset();
    document.querySelector("#inputBuscar").value = "";
    document.querySelector("#selectGenero").value = "";
}


