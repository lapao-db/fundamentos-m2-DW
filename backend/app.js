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
import { loginRouter } from "./src/routes/login.routes.js"; //ruta del servicio login
import cors from "cors";
import path from "path"; 
import { fileURLToPath } from "url";

//2. Configurar las dependencias que se necesiten
//variable convencion app porque es la que da la funcionalidad a toda la app.
const app = express();
dotenv.config();
const port = process.env.PORT;
conexionMongo(); //esto es lo que hace la conexion de db
const _filename = fileURLToPath(import.meta.url); //_filename = backend/app.js
const _dirname = path.dirname(_filename); //_dirname = backend

//3. Funcionalidades que necesite agregar
/* app.get("/",(req,res)=>{
  res.send("Server works!")
}); */
app.use(cors()); //habilita CORS
app.use(express.json()); // Usar formato json en peticiones y respuestas
app.use("/products", productRouter); //ruta generica y enrutador que lo crea, nos vincula, 
app.use("/users", userRouter)
app.use("/uploads",express.static(path.join(_dirname,"src/uploads"))); // tiene que ser la misma que se puso en el controlador y se le indica que es lo que debe exponer cualquier archivo estatico 
// en upload estara el contenido al que se puede acceder desde el navegador
app.use("/login", loginRouter);

// Servir su frontend
app.use(express.static(path.join(_dirname, "dist", "frontend", "browser"))); //propiedad static que permite correr frontend ubicado en dist/browser
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(_dirname, "dist", "frontend", "browser", "index.html")); // cual archivo debe acceder -> puerta de entrada
});

//4. Levantar el servidor //3000, 9000, 6000(no usar este porque genera problemas con el backend)
app.listen(port, ()=>{
  console.log(`El servidor está ejecutandose en http://localhost: ${port}`);  //combinar texto mas variables ` ` 
});