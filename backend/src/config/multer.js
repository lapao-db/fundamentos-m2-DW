// Importaciones Necesarias: multer, 
import multer from "multer";
import path from "path"; // modulo de node
import fs from "fs"; //modulo de node
import { fileURLToPath } from "url"; //modulo de node

// Desarrollo de las funcionalidades

const _filename = fileURLToPath(import.meta.url); //_filename = backend/src/config/multer
const _dirname = path.dirname(_filename); //_dirname = backend/scr/config

// Crear una carpeta donde se guarden los archivos subidos
const UPLOADS_FOLDER = path.join(_dirname, "../uploads");

if(!fs.existsSync(UPLOADS_FOLDER)){
    fs.mkdirSync(UPLOADS_FOLDER)
}

// Especificar como vamos a guardar los archivos: caracteristicas...
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        //donde se va a guardar el archivo
        cb(null,UPLOADS_FOLDER);
    },
    filename: (req, file, cb)=>{
        const ext = path.extname(file.originalname);//extension que viene con el archivo-> .jpg .pdf
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");//nombre base
        cb(null, `${base}-${Date.now()}${ext}`);//nombre del archivo
    }
});

// Qué tipo de archivos vamos a recibir -> filtros (jpg, pdf, word...)
//uso de MIME type de MULTER
const fileFilter = (req, file, cb) =>{
    const allowedTypes = ["image/gif","image/jpeg","image/png","image/svg+xml","image/webp"];
    
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true) // si el archivo es permitido lo guarde en la carpeta uploads
    }else{
        cb(new Error("Archivo no permitido"),false);// no puede guardar el archivo
    }
}

// Definir límites -> tamaño de archivo
// Ej: 5 MB
const limits = {
    fileSize: 5*1024*1024 // 5 MB
}

// Exportar esas caracteristicas -> utilizarlas donde sean necesarias 
// (Se puede hacer exportaciones cada una y en linea se van exportando)
//El unico obligatorio es storage
export const upload = multer({storage, fileFilter, limits});