const fetch = require("node-fetch");
const obtenerVars = require("./obtenervariablesentorno");

let locales = undefined;
const tokenFromFrontend = "sdj&/k.(fk)j#.#$d.a#s%djf.l7).as!#%as/kue#$!.!.#.$!.#$";


const Frontend_TO_Backend = async (req, res) =>
{
    try
    {
        const responseRaw = await fetch(obtenerVars.URI_LOCATIONS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        
        const dataResponse = await responseRaw.json();
        locales = dataResponse.datos;
        console.log("seteado los locales");
        
        if (res !== undefined)
        {
            res.send({"isOk": true});
        }

    }
    catch(error)
    {
        console.log("conexion perdida - locations.js Frontend_TO_Backend");
    }
    
};

exports.Frontend_TO_Backend = async (req, res) =>
{
    Frontend_TO_Backend(req, res);
};

exports.GenerarLocations = async (req, res) =>
{
    
    if (req.body === undefined) 
    {
        return res.send({ "isOk": false });
    }

    console.log("rreer");
    
    const isTokenValid = await CheckToken(req.body.token, tokenFromFrontend);
    
    if (isTokenValid === false) {
        console.error("token invalido");
        return res.send({ "isOk": false });
    }
    
    res.send({"isOk": true});
    
    locales = req.body.datos;
    

};

const CheckToken = async (token, tokenFromFrontend) => {

    let isValid = false;

    if (token === tokenFromFrontend) {
        isValid = true;
    }

    return isValid;
};


exports.GetVarLocales = async () =>
{
    return GetVarLocales();
};

const GetVarLocales = async () =>
{
    return locales;
};

exports.GenerateLocationBrowser = async (languageBrowser, reqHeadersLocation) => {

    //lang = es, it, en, de
    if (languageBrowser === undefined) {
        languageBrowser = await CheckLanguage(reqHeadersLocation);
    }

    let lenguaje = await GetVarLocales();

    // todo: mejorar comprobacion
    if (lenguaje === undefined) {
        console.log("lenguaje esta vacio");
        //pedimos al backend que nos lo envie
        await Frontend_TO_Backend();
        lenguaje = await GetVarLocales();
        
    }
    return lenguaje[languageBrowser];

};

const CheckLanguage = async (lang) => 
{

    //por si acaso hay residuos
    if (lang.indexOf("-") !== -1)
    {
        lang = lang.split("-")[0];
    }
    
    if (lang !== "es" && lang !== "en" && lang !== "it" && lang !== "de") {
        lang = "en";
    }

    return lang;

};

