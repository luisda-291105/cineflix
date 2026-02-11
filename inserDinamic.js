import { findById, findAll, findBy, deleteById } from "./crud.js";
console.log("inserDinamic.js ✔️")

document.addEventListener("DOMContentLoaded", () => {
    mostrarTodasPeliculas();
    inicializarFiltros();
    mostrarControlesLogin();
});

// Renderizar películas en la grid
function renderizarPeliculas(peliculas) {
    const gridPeliculas = document.querySelector("#gridPeliculas");
    if (!gridPeliculas) return;
    
    gridPeliculas.innerHTML = "";
    
    if (peliculas.length === 0) {
        gridPeliculas.innerHTML = "<p class='col-12'>No hay películas para mostrar</p>";
        return;
    }
    
    peliculas.forEach((pelicula) => {
        gridPeliculas.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.titulo}</h5>
                    <p class="card-text">${pelicula.descripcion}</p>
                    <button onclick="window.editarPelicula(${pelicula.id})" class="btn btn-outline-success btn-sm">Editar</button>
                    <button onclick="window.eliminarPelicula(${pelicula.id})" class="btn btn-outline-danger btn-sm">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// Mostrar todas las películas en la grid
function mostrarTodasPeliculas() {
    const peliculas = findAll();
    renderizarPeliculas(peliculas);
}

// Editar película
window.editarPelicula = function(id) {
    const pelicula = findById(id);
    if (!pelicula) return;
    
    document.querySelector("#inputTitulo").value = pelicula.titulo;
    document.querySelector("#inputGenero").value = pelicula.genero;
    document.querySelector("#inputDirector").value = pelicula.girector;
    document.querySelector("#inputAno").value = pelicula.ano;
    document.querySelector("#inputCalificacion").value = pelicula.calificacion;
    document.querySelector("#inputDescripcion").value = pelicula.descripcion;
    document.querySelector("#inputImagen").value = pelicula.imagen;
    
    document.querySelector("#formPelicula").dataset.idPelicula = id;
    
    const btnGuardar = document.querySelector("#btnGuardarPelicula");
    btnGuardar.textContent = "Actualizar";
    
    const modal = new bootstrap.Modal(document.querySelector("#modalPelicula"));
    modal.show();
}

// Eliminar película
window.eliminarPelicula = function(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
        deleteById(id);
        mostrarTodasPeliculas();
    }
}

// Filtrar películas por género
function filtrarPorGenero(genero) {
    const peliculas = genero ? findBy("genero", genero) : findAll();
    renderizarPeliculas(peliculas);
}

// Buscar película por título
function buscarPelicula(termino) {
    const todasPeliculas = findAll();
    const peliculas = todasPeliculas.filter(p => 
        p.titulo.toLowerCase().includes(termino.toLowerCase())
    );
    renderizarPeliculas(peliculas);
}

// Inicializar eventos de filtros
function inicializarFiltros() {
    const selectGenero = document.querySelector("#selectGenero");
    const inputBuscar = document.querySelector("#inputBuscar");
    
    if (selectGenero) {
        selectGenero.addEventListener("change", (e) => {
            inputBuscar.value = "";
            filtrarPorGenero(e.target.value);
        });
    }
    
    if (inputBuscar) {
        inputBuscar.addEventListener("input", (e) => {
            selectGenero.value = "";
            buscarPelicula(e.target.value);
        });
    }
}

// Mostrar controles si usuario está logueado
function mostrarControlesLogin() {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    
    if (usuarioLogueado) {
        document.querySelector("#mainContent").style.display = "block";
        document.querySelector("#btnAgregar").style.display = "block";
    }
}