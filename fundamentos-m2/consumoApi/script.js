//Estandar de Programación -> ECMAScript6 - ECMAS6 - en 2015
//Manejo de errores  

//funcion declarativa  -> se puede  llamar cuando se quiera. Primero se puede llamar y despues crear
/* function nombre (){} */

/* 
Funcion Flecha -> No se puede llamar antes de ser creada la funcion (declarada)  
 const nombre = (var entrada) => {Operaciones} 
*/

const cargarInformacion = async() => {
    
    try {
    const respuesta = await fetch("./json/persona.json");
    const persona = await respuesta.json();
    console.log("persona obetida", persona);
    mostrarInfor(persona);
    } catch (error) {
        console.error("Hubo un error inesperado: ", error);
        alert ("Hubo un error inesperado, intente más tarde")
    }
} 

// Si se usa este metodo con la funcion flecha debe escribirse despues de la funcion.
/* const btnInfo = document.getElementById("btn-info")
btnInfo.addEventListener("click",cargarInformacion) */

const cargarApi = async() => {

    try {
        const respuesta = await fetch("https://ghibliapi.vercel.app/films");
        const peliculas = await respuesta.json();
        console.log("Peliculas Obtenidas", peliculas);
        
    } catch (error) {
        console.error("Hubo un error inesperado: ", error);
        alert ("Hubo un error inesperado, intente más tarde") 
    }
}

//Aqui como se va a crear html entonces no se necesita async
const mostrarInfor = (persona) => {
    console.log("Vamos a construir un html");
    const contenedor = document.getElementById("datos");

    contenedor.innerHTML = `

            <h2 class="miNomnre">${persona.nombre}</h2>
            <p class="miEdad">Edad: ${persona.edad} </p>
            <div class="misHobbies">
                <h3>Hobbies</h3>
                <ul>
                    <li>Hobbie 1: ${persona.hobbies[0]}</li>
                    <li>Hobbie 2:</li>
                    <li>Hobbie 3:</li>
                </ul>
            </div>
    
    `

}