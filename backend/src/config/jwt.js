// 1. Importar dependencias y modulos necesarios
//para poder acceder a las variables de entorno 
import dotenv from "dotenv";
//vamos a usar JsonWebToken
import jsonwebtoken from "jsonwebtoken";

//2. Configurar la variable de entorno
//indicar -> uso de variables de entorno
dotenv.config();
//almacena variable secreta configurada en variable de entorno. Se accede al proceso 
const key = process.env.SECRET_KEY;

//3. Configurar USO de json web Token
//Estructurar el metodo cada que vaya a generar el token

//3.1 Método para generar un JWT -> codifica, encripta la info 
//payload -> info de usuario/cliente
export const generateToken = (payload)=>{
    return new Promise((resolve, reject)=>{
        jsonwebtoken.sign(payload,key,{expiresIn:"1h"},(error, token)=>{
            if (error){
                reject(new Error("Hubo un error al generar el JWToken", error.message));
            }else{
                resolve(token);
            }
        })
    });
}

//3.2 Método para VERIFICAR un JWT-> poder validar que la firma es la nuestra
//recibiendo la informacion usuario -> el token generado
//token -> info codificada (encriptada)
export const verifyToken = (token) => {
    return new Promise ((resolve, reject)=>{
        jsonwebtoken.verify(token, key,(error, decoded)=>{
            if (error){
                reject(new Error("Hubo un error al verificar el JWT", error.message));
            }else{
                resolve(decoded);
            }
        })
    });
}
