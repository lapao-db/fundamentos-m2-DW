import express from "express";

import { postUser, getAllUsers, deleteUserById, putUserById } from "../controllers/users.controller.js";

import { authRole } from "../middleware/auth.js";

//COnfigurar las rutas modelo usuario
export const userRouter = express.Router(); 

//Ruta para el POST
//1- Se define la ruta
userRouter.post("/", postUser);

//Ruta para el GET
userRouter.get("/", authRole("admin") , getAllUsers);

//Ruta para el PUT
//tengo que indicarle que voy a pasarle un parametro -> :parametro
userRouter.put("/:id", putUserById);

// Ruta para el DELETE
userRouter.delete("/:id", deleteUserById);