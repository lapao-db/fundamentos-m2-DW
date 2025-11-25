//1. Importacion de DEPENDENCIAS y MODULOS
import express from "express";

//forma de importar varias cosas que vienen de un mismo lugar
import { postProduct, getAllProducts, deleteProductById, putProductById } from "../controllers/products.controller.js";
import { upload } from "../config/multer.js"

//Importa metodo de autenticacion de rol
import { authRole } from "../middleware/auth.js";


//COnfigurar las rutas
export const productRouter = express.Router(); 

//Ruta para el POST
//1- Se define la ruta
productRouter.post("/crear", authRole("admin"), upload.single("image") ,postProduct);

//Ruta para el GET
productRouter.get("/mostrar", getAllProducts);

//Ruta para el PUT
//tengo que indicarle que voy a pasarle un parametro -> :parametro
productRouter.put("/actualizar/:id", authRole("admin"), putProductById)

// Ruta para el DELETE
productRouter.delete("/eliminar/:id", authRole("admin") ,deleteProductById)