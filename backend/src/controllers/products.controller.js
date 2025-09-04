// 1. importar dependencias y módulos necesarios

// Este import debe ser igual al export del modelo que se va a trabajar
import {productModel} from"../models/products.model.js";

//Definir las acciones que van a realizar -> Siempre van a estar basadas en método CRUD

//1. Método/Acción para CREAR un producto  -> POST
//esta no tiene async porque solo va un mensaje
export const postProduct = async (request, response) => {
    //acá va la lógica de la peticion 
   // return response.json({"mensaje": "Funciona petición POST"});
   //Al conectar con servidor se debe usar la función async. ESte sirve porque se hace con Mongo y Node

   try {
        await productModel.create(request.body);
        return response.status(201).json({
            "mensaje": "Producto creado correctamente"
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al crear producto",
            "error" : error.message || error
        })
    }
  
} 

//2. Método para MOSTRAR todos los productos -> GET
export const getAllProducts = async (req, res) =>{
    //return res.json({"mensaje":"Sirve funcion Mostrar - GET"});
    try {
        const allProducts = await productModel.find();
        return res.status(200).json({
            "mensaje": "Se encontraron todos los productos",
            "data": allProducts
        })
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al mostrar(buscar) productos",
            "error" : error.message || error
        })
    }
}

// 3. Método para ACTUALIZAR un producto -> PUT
export const putProductById = async (req, res) =>{
    //return res.json({"mensaje":"Sirve funcion Actualizar - PUT"});
    try {
        const idForUpdate = req.params; // Parametro por que se va a buscar
        const dataForUpdate = req.body; // informacion que se va a actualizar

        await productModel.findByIdAndUpdate(idForUpdate,dataForUpdate); //indicarle cual es el id y cual es la info a actualizar
        return res.status(200).json({
            "mensaje":"Producto actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al actualizar producto",
            "error" : error.message || error
        })
    }
}

//4. Método para ELIMINAR un producto  -> DELETE
export const deleteProductById = async (req, res)=>{
    //return res.json({"mensaje":"Funciona para Eliminar un producto por id - DELETE"});
    try {
        const idForDelete = req.params;
        await productModel.findByIdAndDelete(idForDelete);

        return res.status(200).json({
            "mensaje": "Ocurrio un error al eliminar producto",
            "error": error.message || error
        })
        
    } catch (error) {
        return res.status(500).json({
            "mensaje": "Ocurrio un error al actualizar producto",
            "error" : error.message || error
        })
    }
}