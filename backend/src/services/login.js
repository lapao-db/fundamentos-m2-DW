// Importaciones de modulos y dependencias
import { userModel } from "../models/users.model.js"; //Validar usuario -> consulta en la base de datos
import { generateToken } from "../config/jwt.js"; // generar el token de seguridad
import bcryptjs from "bcryptjs"; // validar la contraseña -> desencriptar y validar

// Funcion que consulta BS -> debe esperar respuesta BD -> funcion async
export const login = async(request, response)=>{
    try {
        // Aqui va la lógica de inicio de sesión
        // VALIDACION 1: Si el correo existe en la base de datos -> se hace deestructuracion (sacar cada elemento de request.body)
        const {emailLogin, passwordLogin} = request.body;

        //1. Buscar en BAse de Datos -> el correo, si lo encuentra traiga la info. findOne busca y trae lo que encuentre
        const userFound = await userModel.findOne({
            email: emailLogin
        });
        console.log("Usuario Encontrado: ", userFound);

        if(!userFound){
            return response.status(404).json({
                "mensaje": "Usuario no encontrado. Registrate"
            });
        }
        
        //VALIDACION 2. Contraseña correcta
        const validPassword = await bcryptjs.compare(passwordLogin, userFound.password); // devuelve true/false

        if(!validPassword){
            return response.status(401).json({
                "mensaje": "Contraseña incorrecta"
            });
        }
        
        //GENERACION DEL TOKEN -> Validar permisos
        const payload = {
            id: userFound._id,
            username: userFound.username 
        }
         //validacion de rol -> admin: true/false
        if (userFound.role === "admin"){
            payload.admin = true;
        }else{
            payload.admin = false;
        }
        
        const token = await generateToken(payload);
        console.log("payload: ", payload);
        console.log("token: ", token);

        return response.status(200).json({
            "mensaje": "Inicio de sesión exitoso",
            "token":token
        });

    } catch (error) {
        return res.status(400).json({
            "mensaje": "Ocurrio un error al iniciar sesión",
            "error" : error.message || error
        })
    }
}
