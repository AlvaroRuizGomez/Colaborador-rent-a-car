// const express = require('express');
const fetch = require("node-fetch");
const Joi = require("joi");
const nanoid = require("nanoid");
const session = require('express-session');
const geolocation = require("./geolocation");
const locations = require("./locations");

//variables
const URI_API_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_API_BACKEND}`;
const URI_STATS_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_STATS_BACKEND}`;


const eta = require("eta");


exports.getHome = async (req, res, languageBrowser) =>
{

    const id = nanoid.nanoid();
    const location = await geolocation.GetIPTimeZone(req);

    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.status(404).send("Not Found");
    }
    
    const locationLanguage = await GenerateLocationBrowser(
        languageBrowser, 
        req.headers["accept-language"].split(",")[1].split(";")[0]
    );

    res.render("inicio", { "success": id, "locations": locationLanguage });

    const body = {
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS,
        "useragent": req.useragent,
        "location": location,
        "id": id
    };

    const responseRaw = await fetch(URI_STATS_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });

    const dataResponse = await responseRaw.json();

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== "") {

    }

    if (dataResponse.isOk === false) {
        return res.status(404).send("Not found");
    }

};

const GenerateLocationBrowser = async (languageBrowser, reqHeadersLocation) =>
{

    //lang = es, it, en, de
    if (languageBrowser === undefined) 
    {
        languageBrowser = await CheckLanguage(reqHeadersLocation);
    }

    let lenguaje = await locations.GetVarLocales();

    // todo: mejorar comprobacion
    if (lenguaje === undefined)
    {
        console.log("lenguaje esta vacio");
        //pedimos al backend que nos lo envie
        await locations.Frontend_TO_Backend();
        lenguaje = await locations.GetVarLocales();
    }
    return lenguaje[languageBrowser];

};

const CheckLanguage = async (lang) =>
{

    if (lang !== "es" && lang !== "en" && lang !== "it" && lang !== "de") {
        lang = "en";
    }

    return lang;

};

exports.postHome = async (req, res) =>
{

    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("control schema invalido");
        return res.status(404).send("Not found");
    }

    const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, ...req.body };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_API_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });


    const dataResponse = await responseRaw.json();

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== "")
    {

    }
    // const languageBrowser = await CheckLanguage(req.body.idioma);
    // const lenguaje = await locations.GetVarLocales();

    const locationLanguage = await GenerateLocationBrowser(req.body.idioma);

    if (dataResponse.isOk === false)
    {
        if (dataResponse.errorFormulario === "")
        {
            // Blacklist?
            return res.status(404).sender("Not found");
        }
        else
        {
            return res.render("inicio", 
            {
                "success": req.body.success,
                "errorFormulario": dataResponse.errorFormulario,
                "locations": locationLanguage
            });
        }

    }

    req.session.data = dataResponse.data;

    // dataResponse.data = [];
    // dataResponse.errorFormulario = "error_formulario1";

    if (dataResponse.data.length <= 0) {
        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "success": req.body.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            "locations": locationLanguage

        });
    }
    else {

        // ordenar por precio
        dataResponse.data = await OrdenarPorPrecioTotalDias(dataResponse.data);

        //ordenar por clase vehiculos
        dataResponse.data = await OrdenaPorClaseVehiculos(dataResponse.datosOrdenacion, dataResponse.data)

        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "success": req.body.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            "suplementogenerico_base": dataResponse.suplementogenerico_base,
            "suplementotipochofer_base": dataResponse.suplementotipochofer_base,
            "preciosPorClase": dataResponse.preciosPorClase,
            "condicionesgenerales": dataResponse.condicionesgenerales,
            "locations": locationLanguage
        });

    }



};



const OrdenaPorClaseVehiculos = async (datosOrdenacion, datosVehiculos) => {
    let buffer = [];

    // ordenar por claseVehiculo
    for (let j = 0; j < datosOrdenacion.length; j++) {
        for (let i = 0; i < datosVehiculos.length; i++) {
            if (datosVehiculos[i].clasevehiculo !== datosOrdenacion[j]) continue;

            buffer.push(datosVehiculos[i]);

        }

    }

    return buffer;


}

const OrdenarPorPrecioTotalDias = async (datosvehiculos) => {

    let datosVehiculosOrdenados = datosvehiculos.slice();
    let longitudDatosVehiculosOrdenados = datosVehiculosOrdenados.length;
    let bufferDatosVehiculos = new Array(longitudDatosVehiculosOrdenados);

    for (let size = 1; size < longitudDatosVehiculosOrdenados; size *= 2) {
        for (let leftStart = 0; leftStart < longitudDatosVehiculosOrdenados; leftStart += 2 * size) {
            let indiceIzquierda = leftStart;
            let indiceDerecha = Math.min(indiceIzquierda + size, longitudDatosVehiculosOrdenados);
            let limiteIzquierda = indiceDerecha;
            let limiteDerecha = Math.min(indiceDerecha + size, longitudDatosVehiculosOrdenados);
            let i = indiceIzquierda;

            while (indiceIzquierda < limiteIzquierda && indiceDerecha < limiteDerecha) {
                if (datosVehiculosOrdenados[indiceIzquierda].preciototaldias <= datosVehiculosOrdenados[indiceDerecha].preciototaldias) {
                    bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceIzquierda++];
                }
                else {
                    bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceDerecha++];
                }
            }

            while (indiceIzquierda < limiteIzquierda) {
                bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceIzquierda++];
            }

            while (indiceDerecha < limiteDerecha) {
                bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceDerecha++];
            }
        }

        let temp = datosVehiculosOrdenados;
        datosVehiculosOrdenados = bufferDatosVehiculos,
            bufferDatosVehiculos = temp;
    }

    return datosVehiculosOrdenados;
}




const ControlSchema = async (body) => {


    const schema = Joi.object({
        conductor_con_experiencia: Joi.string(),
        "idioma": Joi.string().required(),
        edad_conductor: Joi.number().required(),
        "fase": Joi.number().required(),
        fechaDevolucion: Joi.string().required(),
        horaDevolucion: Joi.string().required(),
        fechaRecogida: Joi.string().required(),
        horaRecogida: Joi.string().required(),
        "success": Joi.string().required(),
    });


    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };
    const validation = schema.validate(body, options);
    let isValid = false;
    
    if (validation.error === undefined)
    {
        isValid = true;
    } 
    
    return isValid;

}
