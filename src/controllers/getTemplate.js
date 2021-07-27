const fs = require("fs");
const path = require("path");
// const { GenerateCacheInicio } = require("./inicio");
const generarHtml = require("./generar");

exports.listadoNombresArchivo = {
    "pagina01": { 
        "nombre": "inicio.html",
        "cache": true
    },
    "footer": { 
        "nombre": "footer.html",
        "cache": true
    },
    "header": {
        "nombre": "header.html",
        "cache": true
    },
    "pagina02": {
        "nombre": "muestraOferta.html",
        "cache": true
    
    },
    "pagina03": {
        "nombre": "reservar.html",
        "cache": true
    },
    "detalleOferta": {
        "nombre": "oferta.html",
        "cache": true
    
    }
};



exports.GetTemplate = async (req, res) =>
{
    const nombre = this.listadoNombresArchivo[req.body.accion].nombre;
    const archivo = await ReadFile(nombre);

    res.send({
        "archivo": archivo,
        "nombreArchivo": nombre
    });


};

exports.DetalleTemplate = async (req, res) =>
{

    const fileName = this.listadoNombresArchivo[req.body.nombreArchivo].nombre;
    const texto = req.body.textarea;
    
    let resultado = {};
    switch(req.body.accion)
    {
        case "guardar":
            resultado = await SaveTextToFile(fileName, texto);
        break;
        case "generar":
            resultado = await generarHtml.GenerarCacheFromInitServer(fileName);
            if (resultado.isOk === true)
            {
                this.listadoNombresArchivo[req.body.nombreArchivo].cache = true;
            }
        break;
        case "default": 
            resultado = await Default(fileName);
        break;

    }
    
    res.send(resultado);

};


const SaveTextToFile = async (nameFile, texto) =>
{

    let respuesta = { "resultado": "Guardado intentalo de nuevo" };
    const resultado = await SaveFile(nameFile, texto);
    if (resultado === true)
    {
        respuesta = { "resultado": "Guardado correcto" };
    }
    
    return respuesta;
    
};





const Default = async () =>
{
    
    
    
};

exports.SaveFileExport = async (nameFile, texto) =>
{
    return await SaveFile(nameFile, texto);

};

exports.SaveFileToPath = async (path, texto) =>
{

    try {
        // const archivo = path.resolve(__dirname, `../../public/${nameFile}`);
        await fs.promises.writeFile(path, texto, "utf-8");
        return true;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read the secret: ${path}. Err: ${err}`);

        } else {
            console.debug(`Could not find the secret ${path}. Err: ${err}`);

        }
        return false;
    }

};

const SaveFile = async (nameFile, texto) => {
    try {
        const archivo = path.resolve(__dirname, `../../public/${nameFile}`);
        await fs.promises.writeFile(archivo, texto, "utf-8");
        return true;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read the secret: ${nameFile}. Err: ${err}`);
            
        } else {
            console.debug(`Could not find the secret ${nameFile}. Err: ${err}`);
            
        }
        return false;
    }
};

exports.ReadFileExport = async (nameFile) =>
{
    return await ReadFile(nameFile);

};

exports.ReadFileWithPath = async (path) =>
{
    try {
        // const archivo = path.resolve(__dirname, `../../public/${nameFile}`);
        const dataSinSanitizar = await fs.promises.readFile(path, { encoding: "utf-8" });
        return dataSinSanitizar;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read: ${path}. Err: ${err}`);
        } else {
            console.debug(`Could not find the secret ${path}. Err: ${err}`);
        }
    }
};

const ReadFile = async (nameFile) => {
    try {
        const archivo = path.resolve(__dirname, `../../public/${nameFile}`);
        const dataSinSanitizar = await fs.promises.readFile(archivo, {encoding: "utf-8"});
        return dataSinSanitizar;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read: ${nameFile}. Err: ${err}`);
        } else {
            console.debug(`Could not find the secret ${nameFile}. Err: ${err}`);
        }
    }
};
