import create from "./crud.js";
console.log("localStorage-peliculas.js ✔️")

// botones para guardar peliculas
const btnGuardarPelicula = document.querySelector("#btnGuardarPelicula");

// variables del modal para ver detalles de las peliculas
const detallesGenero = document.querySelector("#detallesGenero");
const detallesDirector = document.querySelector("#detallesDirector");
const detallesAno = document.querySelector("#detallesAno");
const detallesCalificacion = document.querySelector("#detallesCalificacion");
const detallesDescripcion = document.querySelector("#detallesDescripcion");

btnGuardarPelicula.addEventListener("click" , () => {
    // variables para crear peliculas
let pelicula = {
    "titulo": document.querySelector("#inputTitulo").value,
    "genero": document.querySelector("#inputGenero").value,
    "girector": document.querySelector("#inputDirector").value,
    "ano": document.querySelector("#inputAno").value,
    "calificacion": document.querySelector("#inputCalificacion").value,
    "descripcion": document.querySelector("#inputDescripcion").value,
    "imagen": document.querySelector("#inputImagen").value
};

let peliculasRecolectadas  = create(pelicula);
console.table(peliculasRecolectadas)

document.querySelector("#formPelicula").reset();

})


document.querySelector("#mainContent").style.display = "block"
document.querySelector("#btnAgregar").style.display = "block"