import { userModel } from "../models/users.model.js";
// Este import debe ser igual al export del modelo que se va a trabajar


//1. Método/Acción para CREAR un producto  -> POST
//esta no tiene async porque solo va un mensaje
export const postUser = (request, response) => {
    //acá va la lógica de la peticion
    return response.json({"mensaje": "Funciona petición mostrar Usuario - POST"});
} 

//2. Método para MOSTRAR todos los productos -> GET
export const getAllUsers = (req, res) =>{

    return res.json({"mensaje":"Sirve funcion Mostrar todos usuarios - GET"});
}

// 3. Método para ACTUALIZAR un producto -> PUT
export const putUserById = (req, res) =>{
    return res.json({"mensaje":"Sirve funcion Actualizar usuario - PUT"});
}

//4. Método para ELIMINAR un producto  -> DELETE
export const deleteUserById = (req, res)=>{
    return res.json({"mensaje":"Funciona para Eliminar un usuario por id - DELETE"});
}