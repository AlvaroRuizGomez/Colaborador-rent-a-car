const fetch = require("node-fetch");
const obtenerVars = require("./obtenervariablesentorno");
const eta = require("eta");

const URI_BACKEND_GENERAR_CONDICIONES = obtenerVars.ObtenerURI_BACKEND_GENERAR_CONDICIONES();

let memWebCache = undefined;

let versionActualWebCache = 1;
let versionMaximaWebCache = 1;

exports.GenerarWebCache = async (req, res) =>
{
    versionMaximaWebCache++;

};


exports.generarHTML = async (req, res) =>
{
    // const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, ...req.query };
    // //enviamos al backedn la informacion
    // const responseRaw = await fetch(URI_BACKEND_GENERAR_CONDICIONES, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(body)
    // });


    // const dataResponse = await responseRaw.json();

    // const fileName = '../../public/condicionesgenerales.html';
    // const stream = fs.createWriteStream(fileName);

    // stream.once('open', function (fd) {
    //     stream.end(dataResponse.html);
    // });

};

exports.versionActualWebCache;
exports.versionMaximaWebCache;