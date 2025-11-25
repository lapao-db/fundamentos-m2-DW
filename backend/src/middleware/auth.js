//1 importar lo necesario: necesitamos validar el rol -> permisos 
import { verifyToken } from "../config/jwt.js";

export const authRole = (requiredRole) => {
    //funcion generar parametro rol-requerido
    return async (request, response, next) => {
        //Lógica de validación -> retorna intermediario que getiona la petición - varias validaciones
        //1. Verificar si se envia un Token en la cabecera de la Petición
        const token = request.headers["authorization"]; // Aqui se esta validando el token que viene en header
        //console.log("Token recibido en la cabecera de la petición: " + token); Llega con la palabra Bearer

        if(!token){
            return response.status(401).json({
                "mensaje": "No se encontró token, permiso denegado"
            });
        }

        //2. Verificar que el Token sea permitido (JWT)
        const allowedToken = (token).split(" ")[1];
        //console.log("Token separado de Bearer: " + allowedToken);

        // Manejo de errores - try catch porque verifyToken es una promesa -> se demora 
        try {
            const decoded = await verifyToken(allowedToken);
            console.log("Informacion decodificada - token: " , decoded);

            // 3. Verificar especificamente si el rol es administrador
            if(requiredRole === "admin" && !decoded.admin){
                return response.status(401).json({
                    "mensaje":"Acceso no permitido, no eres administrador"
                })
            }

        } catch (error) {
            return response.status(401).json({
                "mensaje": "Fallo autenticación: Token no permitido"
            })
        }

        


        // next () -> Indica que debe continuar con el siguiente proceso
        next();

    }
}
