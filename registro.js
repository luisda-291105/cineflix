// Obtener usuarios desde localStorage
function obtenerUsuarios() {
    const usuarios = localStorage.getItem("usuariosApp");
    return usuarios ? JSON.parse(usuarios) : {};
}

// Validar que los campos no estén vacíos
function validarCamposRegistro(nombre, email, telefono, usuario, password, confirmPassword) {
    if (!nombre.trim()) {
        return { valido: false, mensaje: "El nombre no puede estar vacío" };
    }
    if (!email.trim()) {
        return { valido: false, mensaje: "El email no puede estar vacío" };
    }
    if (!telefono.trim()) {
        return { valido: false, mensaje: "El teléfono no puede estar vacío" };
    }
    if (!usuario.trim()) {
        return { valido: false, mensaje: "El usuario no puede estar vacío" };
    }
    if (!password.trim()) {
        return { valido: false, mensaje: "La contraseña no puede estar vacía" };
    }
    if (!confirmPassword.trim()) {
        return { valido: false, mensaje: "Debe confirmar la contraseña" };
    }
    return { valido: true, mensaje: "" };
}

// Validar formato del email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return { valido: false, mensaje: "El email no es válido" };
    }
    return { valido: true, mensaje: "" };
}

// Validar longitud del usuario
function validarUsuarioLongitud(usuario) {
    if (usuario.length < 4) {
        return { valido: false, mensaje: "El usuario debe tener mínimo 4 caracteres" };
    }
    return { valido: true, mensaje: "" };
}

// Validar longitud de la contraseña
function validarPasswordLongitud(password) {
    if (password.length < 6) {
        return { valido: false, mensaje: "La contraseña debe tener mínimo 6 caracteres" };
    }
    return { valido: true, mensaje: "" };
}

// Validar que las contraseñas coincidan
function validarPasswordIguales(password, confirmPassword) {
    if (password !== confirmPassword) {
        return { valido: false, mensaje: "Las contraseñas no coinciden" };
    }
    return { valido: true, mensaje: "" };
}

// Validar que el usuario no exista
function validarUsuarioExistente(usuario) {
    const usuarios = obtenerUsuarios();
    if (usuarios[usuario]) {
        return { valido: false, mensaje: "El usuario ya existe" };
    }
    return { valido: true, mensaje: "" };
}

// Registrar nuevo usuario
function registrarUsuario(nombre, email, telefono, usuario, password) {
    const usuarios = obtenerUsuarios();
    usuarios[usuario] = password;
    localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
    
    // Guardar datos adicionales del usuario
    let usuariosCompletos = JSON.parse(localStorage.getItem("usuariosCompletos") || "{}");
    usuariosCompletos[usuario] = {
        "id": Date.now(),
        "nombre": nombre,
        "email": email,
        "telefono": telefono,
        "fechaRegistro": new Date().toLocaleDateString()
    };
    localStorage.setItem("usuariosCompletos", JSON.stringify(usuariosCompletos));
    
    return { valido: true, mensaje: "Usuario registrado correctamente" };
}

// Manejo del formulario de registro
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("#formRegistro");
    
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nombre = document.querySelector("#inputNombre").value;
            const email = document.querySelector("#inputEmail").value;
            const telefono = document.querySelector("#inputPhone").value;
            const usuario = document.querySelector("#inputUserReg").value;
            const password = document.querySelector("#inputPasswordReg").value;
            const confirmPassword = document.querySelector("#inputConfirmPassword").value;
            
            // Validar campos vacíos
            const validacionCampos = validarCamposRegistro(nombre, email, telefono, usuario, password, confirmPassword);
            if (!validacionCampos.valido) {
                alert(validacionCampos.mensaje);
                return;
            }
            
            // Validar email
            const validacionEmail = validarEmail(email);
            if (!validacionEmail.valido) {
                alert(validacionEmail.mensaje);
                return;
            }
            
            // Validar usuario
            const validacionUsuario = validarUsuarioLongitud(usuario);
            if (!validacionUsuario.valido) {
                alert(validacionUsuario.mensaje);
                return;
            }
            
            // Validar usuario no exista
            const validacionUsuarioExiste = validarUsuarioExistente(usuario);
            if (!validacionUsuarioExiste.valido) {
                alert(validacionUsuarioExiste.mensaje);
                return;
            }
            
            // Validar password longitud
            const validacionPasswordLong = validarPasswordLongitud(password);
            if (!validacionPasswordLong.valido) {
                alert(validacionPasswordLong.mensaje);
                return;
            }
            
            // Validar passwords iguales
            const validacionPasswordIguales = validarPasswordIguales(password, confirmPassword);
            if (!validacionPasswordIguales.valido) {
                alert(validacionPasswordIguales.mensaje);
                return;
            }
            
            // Registrar usuario
            const resultado = registrarUsuario(nombre, email, telefono, usuario, password);
            alert(resultado.mensaje);
            
            if (resultado.valido) {
                formRegistro.reset();
                // Cambiar a tab de login
                document.querySelector("#login-tab").click();
            }
        });
    }
});
