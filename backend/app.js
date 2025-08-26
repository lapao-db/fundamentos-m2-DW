// El archivo de ejecución de nuestra aplicación
// Configurar nuestra aplicacion y gestionar la Logica de negocio. 
// Todo se hace en este archivo.

//Prueba para ver que funciona:
//console.log("Hola Desarrolladores :P");

//1. Importar las dependencias necesarias
import express from "express";

//2. Configurar las dependencias que se necesiten
//variable convencion app porque es la que da la funcionalidad a toda la app.
const app = express();
const port = 3000;

//3. Funcionalidades que necesite agregar
app.get("/",(req,res)=>{
  res.send("Server works!")
});

//4. Levantar el servidor //3000, 9000, 6000(no usar este porque genera problemas con el backend)
app.listen(port, ()=>{
  console.log(`El servidor está ejecutandose en http://localhost: ${port}`);  //combinar texto mas variables ` ` 
});