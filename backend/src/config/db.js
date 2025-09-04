// 1. Importar las dependencias necesarias
import mongoose from "mongoose";


//2. Crear la funcion de conexión
//Definir una instrucción 
export const conexionMongo = async()=>{
    try {
        await mongoose.connect(process.env.BD_URL,{dbName:"e-commerce"});
        console.log("Conexión Exitosa con la base de datos");
    } catch (error) {
        console.error("Error de conexión: ", error);
    }
}