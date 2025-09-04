// 1. Importar la dependencia de base de datos 
import mongoose from "mongoose";

// COntruir Plantilla modelo
// 1. definir Constante: nombre relacionado al modelo en singular -> 1 plantilla
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    username: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type:Number,
    },
    password:{ 
        type:String,
        required: true
    },
    role: {
        type: String,
        enum:["admin", "user"],
        required: true
    },

})

export const userModel = mongoose.model("users",userSchema);