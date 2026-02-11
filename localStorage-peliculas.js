import { create, update } from "./crud.js";
import { findAll } from "./crud.js";
console.log("localStorage-peliculas.js ✔️")

const btnGuardarPelicula = document.querySelector("#btnGuardarPelicula");

btnGuardarPelicula.addEventListener("click" , () => {
    const formPelicula = document.querySelector("#formPelicula");
    const idPelicula = formPelicula.dataset.idPelicula;
    
    const pelicula = {
        "titulo": document.querySelector("#inputTitulo").value,
        "genero": document.querySelector("#inputGenero").value,
        "girector": document.querySelector("#inputDirector").value,
        "ano": document.querySelector("#inputAno").value,
        "calificacion": document.querySelector("#inputCalificacion").value,
        "descripcion": document.querySelector("#inputDescripcion").value,
        "imagen": document.querySelector("#inputImagen").value
    };
    
    if (idPelicula) {
        // Actualizar película existente
        update(parseInt(idPelicula), pelicula);
        delete formPelicula.dataset.idPelicula;
        btnGuardarPelicula.textContent = "Guardar";
    } else {
        // Crear nueva película
        create(pelicula);
    }
    
    formPelicula.reset();
    mostrarTodasPeliculas();
})



// Ejemplos de uso: buscar
// const usuario = findById(123);
// const todos = findAll();
// const porEmail = findBy('email', 'juan@example.com');



// Ejemplo de uso: actualizar
// const actualizado = update(123, { name: 'Pedro', email: 'pedro@example.com' });


// Ejemplo de uso: eliminar
// const eliminado = deleteById(123);
