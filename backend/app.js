// El archivo de ejecución de nuestra aplicación
// Configurar nuestra aplicacion y gestionar la Logica de negocio. 
// Todo se hace en este archivo.

//Prueba para ver que funciona:
//console.log("Hola Desarrolladores :P");

//1. Importar las dependencias necesarias
import express, { json } from "express";
import dotenv from "dotenv";
import { conexionMongo } from "./src/config/db.js";
import { productRouter } from "./src/routes/products.routes.js";
import { userRouter } from "./src/routes/users.routes.js";

//2. Configurar las dependencias que se necesiten
//variable convencion app porque es la que da la funcionalidad a toda la app.
const app = express();
dotenv.config();
const port = process.env.PORT;
conexionMongo(); //esto es lo que hace la conexion de db

//3. Funcionalidades que necesite agregar
app.get("/",(req,res)=>{
  res.send("Server works!")
});

app.use(express.json()); // Usar formato json en peticiones y respuestas
app.use("/products", productRouter); //ruta generica y enrutador que lo crea, nos vincula, 
app.use("/users", userRouter)

//4. Levantar el servidor //3000, 9000, 6000(no usar este porque genera problemas con el backend)
app.listen(port, ()=>{
  console.log(`El servidor está ejecutandose en http://localhost: ${port}`);  //combinar texto mas variables ` ` 
});