//1.  importar dependencia para crear estructura de la base de datos
import mongoose, { trusted } from "mongoose";


//2. COnstruir la platilla modelo 
//modelo: plantilla que se replica en la aplicacion
const productSchema = new mongoose.Schema({
    image: {
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    categories:{
        type: String,
        enum: ["papel", "libro", "regalo"]
    },
    isAvailable:{
        type: Boolean,
    },
    date: {
        type:Date,
        default:Date.now
    }
});

export const productModel = mongoose.model("products", productSchema);