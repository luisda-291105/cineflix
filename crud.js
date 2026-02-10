/* 
----------------- _ CREATE _ ---------------------------
*/

function create(data) {
    
    
    // Obtener registros existentes
    const peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');
    
     // Crear objeto con ID
    const pelicula = {
        id: peliculas.length + 1,
        ...data
    }; 

    // Agregar nuevo registro
    peliculas.push(pelicula);
    
    // Guardar en localStorage
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    
    return pelicula;
}



export default create 