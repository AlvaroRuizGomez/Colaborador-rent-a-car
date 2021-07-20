const fs = require("fs");
const path = require("path");


exports.GetTemplate = async (req, res) =>
{

    let nombreArchivo = {
        "pagina01": "inicio.html",
        "footer": "footer.html",
        "header": "header.html",
        "pagina02": "muestraOferta.html",
        "pagina03": "reservar.html",
        "detalleOferta": "oferta.html"
    };

    const nombre = nombreArchivo[req.body.accion];
    const archivo = await ReadFile(nombre);

    res.send({
        "archivo": archivo,
        "nombreArchivo": nombre
    });


};


const ReadFile = async (nameFile) => {
    try {
        const archivo = path.resolve(__dirname, `../../public/${nameFile}`);
        const dataSinSanitizar = fs.readFileSync(archivo, "utf8");
        return dataSinSanitizar;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read the secret: ${nameFile}. Err: ${err}`);
        } else {
            console.debug(`Could not find the secret ${nameFile}. Err: ${err}`);
        }
    }
};