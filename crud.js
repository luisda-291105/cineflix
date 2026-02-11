/* 
----------------- _ CREATE _ ---------------------------
*/

export function create(data) {
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

/* 
----------------- _ READ _ ---------------------------
*/

// Función BUSCAR por ID
export function findById(id) {
    const peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');
    return peliculas.find(pelicula => pelicula.id == id);
}

// Función BUSCAR todos
export function findAll() {
    return JSON.parse(localStorage.getItem('peliculas') || '[]');
}

// Función BUSCAR por filtro
export function findBy(key, value) {
    const peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');

    return peliculas.filter(pelicula => pelicula[key] === value);
}

/* 
----------------- _ UPDATA _ ---------------------------
*/

// Función ACTUALIZAR por ID
export function update(id, newData) {
    const peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');
    const index = peliculas.findIndex(pelicula => pelicula.id == id);
    
    if (index === -1) return null;
    
    peliculas[index] = {
        ...peliculas[index],
        ...newData
    };
    
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
    return peliculas[index];
}

/* 
----------------- _ DELETE _ ---------------------------
*/

// Función ELIMINAR por ID
export function deleteById(id) {
    // Obtener registros existentes   
    const peliculas = JSON.parse(localStorage.getItem('peliculas') || '[]');

    
    // Filtrar eliminando el registro con ese ID
    const newRecords = peliculas.filter(record => record.id != id);
    
    // Si no se eliminó nada, retornar false
    if (peliculas.length === newRecords.length) return false;
    
    // Guardar en localStorage
    localStorage.setItem('peliculas', JSON.stringify(newRecords));
    
    return true;
}