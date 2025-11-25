import { userModel } from "../models/users.model.js";
// Este import debe ser igual al export del modelo que se va a trabajar
import bcryptjs from "bcryptjs";


//1. Método/Acción para CREAR un Usuario  -> POST
//esta no tiene async porque solo va un mensaje
export const postUser = async (request, response) => {
    //acá va la lógica de la peticion
    //return response.json({"mensaje": "Funciona petición mostrar Usuario - POST"});
    try {
        //DEESTRUCTURACIÓN: cuando se necesiata procesar la información del usuario ANTES de guardarla.
        const {name, username, email, age, password, role} = request.body;
        
        // AQUI Agregar el metodo de agregar contraseña -> En caso de Requiere validar la contraseña       
    
        //.hash -> encripta la contraseña
        const codedPassword = await bcryptjs.hash(password, 8) // este numero es Salt - para configurar la complejidad de la encriptación
        await userModel.create({
            name,
            username,
            email,
            age,
            password:codedPassword,
            role
        });

        return response.status(201).json({
            "mensaje":"Usuario creado correctamente"
        })
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al crear usuario",
            "error" : error.message || error
        })
    } 
}
//2. Método para MOSTRAR todos los productos -> GET
export const getAllUsers = async (req, res) =>{
    //return res.json({"mensaje":"Sirve funcion Mostrar todos usuarios - GET"});
    try {
        const allUsers = await userModel.find();
        return res.status(200).json({
            "mensaje": "Se encontraron todos los Usuarios",
            "userData": allUsers
        })
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al mostrar(buscar) productos",
            "error" : error.message || error
        })
    }
}

// 3. Método para ACTUALIZAR un producto -> PUT
export const putUserById = (req, res) =>{
    return res.json({"mensaje":"Sirve funcion Actualizar usuario - PUT"});
}

//4. Método para ELIMINAR un producto  -> DELETE
export const deleteUserById = async(req, res)=>{
    // return res.json({"mensaje":"Funciona para Eliminar un usuario por id - DELETE"});
    try {
        const idForDelete = req.params.id;
        await userModel.findByIdAndDelete(idForDelete);

        return res.status(200).json({
            "mensaje": "elimino Usuario",
            
        })
        
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al elminar usuario",
            "error" : error.message || error 
        })
    }
}