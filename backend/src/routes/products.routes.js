//1. Importacion de DEPENDENCIAS y MODULOS
import express from "express";

//forma de importar varias cosas que vienen de un mismo lugar
import { postProduct, getAllProducts, deleteProductById, putProductById } from "../controllers/products.controller.js";

//COnfigurar las rutas
export const productRouter = express.Router(); 

//Ruta para el POST
//1- Se define la ruta
productRouter.post("/crear", postProduct);

//Ruta para el GET
productRouter.get("/mostrar", getAllProducts);

//Ruta para el PUT
//tengo que indicarle que voy a pasarle un parametro -> :parametro
productRouter.put("/actualizar/:id", putProductById)

// Ruta para el DELETE
productRouter.delete("/eliminar/:id", deleteProductById)