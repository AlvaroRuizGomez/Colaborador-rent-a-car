// const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const Joi = require("joi");
const nanoid = require("nanoid");
const querystring = require("querystring");

const geolocation = require("./geolocation");
const locations = require("./locations");
const obtenerVars = require("./obtenervariablesentorno");
const logicDiferenciaFechas = require("./logicDiferenciaFechas");
const logicHelper = require("./logicHelper");

const eta = require("eta");



exports.getHome = async (req, res, languageBrowser, isPagoCorrecto = false) =>
{

    const id = nanoid.nanoid();
    const location = await geolocation.GetIPTimeZone(req);

    // Bot check
    if ((location.agent && location.agent.isBot === true) || (req.headers["accept-language"] === undefined)) 
    {
        // TODO: registrar los eventos en sitio separado
        console.log("bot" + location.agent);
        // return res.status(404).send("Not Found");
    }


    // const languagesAccpeted = {
    //     "en": "en",
    //     "es": "es",
    //     "it": "it",
    //     "de": "de",
    // };

    // // let languageNativeBrowser = undefined;
    // let textoRutaArchivo = "";

    // if (languageBrowser === undefined)
    // {
    //     languageBrowser = req.headers["accept-language"].split(",")[0].split("-")[0];
    // }

    // if ((languageBrowser in languagesAccpeted) === true)
    // {
    //     textoRutaArchivo = `../../public/inicio_cache_${languagesAccpeted[languageBrowser]}.html`;
    // }
    // else
    // {
    //     textoRutaArchivo = `../../public/inicio_cache_${languagesAccpeted["en"]}.html`;
    // }
    
    // return res.render(path.join(__dirname, textoRutaArchivo), {
    //     "success": id,
    //     "numeroDias": 3
    // });
    

    let locationLanguage = "en";
    let languageHeader = "en";
    console.log("lenguaje=" + req.headers["accept-language"]);
    if (req.headers["accept-language"] !== undefined)
    {
        //TODO: arriba cacheado
        languageHeader = req.headers["accept-language"].split(",")[0].split("-")[0];
    }
    
    locationLanguage = await locations.GenerateLocationBrowser(
        languageBrowser, 
        languageHeader
    );
    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15
    const isAvifSupported = await logicHelper.IsAvifSupported(req.get("Accept"));
    
    const body = {
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS,
        "useragent": req.useragent,
        "direct": false,
        "location": location,
        "id": id
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(obtenerVars.URI_GETALL_BACKEND, {
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

    if (dataResponse.isOk === false)
    {
        return res.status(404).send("Not found");
    }

    if (dataResponse.data.length <= 0) {
        
        if (isPagoCorrecto === true) 
        {

            res.render(path.join(__dirname, "../../public/reservacompletada.html"), {
                "data": dataResponse.data,
                "isAvifSupported": isAvifSupported,
                "errorFormulario": dataResponse.errorFormulario,
                "success": id,
                "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
                "locations": locationLanguage

            });
        }
        else
        {
            res.render(path.join(__dirname, "../../public/inicio.html"), {
                "data": dataResponse.data,
                "isAvifSupported": isAvifSupported,
                "errorFormulario": dataResponse.errorFormulario,
                "success": id,
                "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
                "locations": locationLanguage
    
            });

        }


    }
    else 
    {

        //ordenar por clase vehiculos
        dataResponse.data = await OrdenaPorClaseVehiculos(dataResponse.datosOrdenacion, dataResponse.data)

        if (isPagoCorrecto === true) 
        {

            res.render(path.join(__dirname, "../../public/reservacompletada.html"), {
                "data": dataResponse.data,
                "success": id,
                "isAvifSupported": isAvifSupported,
                "preciosPorClase": dataResponse.preciosPorClase,
                "locations": locationLanguage,
                "numeroDias": 3
            });

        }
        else
        {
            res.render(path.join(__dirname, "../../public/inicio.html"), {
                "data": dataResponse.data,
                "success": id,
                "isAvifSupported": isAvifSupported,
                "preciosPorClase": dataResponse.preciosPorClase,
                "locations": locationLanguage,
                "numeroDias": 3
            });

        }

    }


    // enviar stats al backend
    // const responseRaw = await fetch(obtenerVars.URI_STATS_BACKEND, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(body)
    // });

    // const dataResponse = await responseRaw.json();

    // // TODO: seguridad comprobar que proviene del backend
    // if (dataResponse.token !== "") {

    // }

    // if (dataResponse.isOk === false) {
    //     return res.status(404).send("Not found");
    // }

};




exports.redirectToHome = async (req, res) =>
{
    return res.redirect("/");
};

exports.postHomeDirect = async (req, res) =>
{

    
    let query = req.query;
    const idioma = req.headers["accept-language"].split(",")[0].split("-")[0];

    if (query["vehiculo"] === undefined)
    {
        query = await sanitizar(req.url, idioma);

    }

    const isSchemaValid = await ControlDirectSchema(query);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("inicio.js control schema invalido");
        return res.status(404).send("Not found");
    }

    const diferenciaDias = await logicDiferenciaFechas.DiferenciaFechaRecogidaDevolucion(query);

    if (query.edad_conductor - 0 < 21 || query.edad_conductor - 0 > 90 || query.anyos_carnet - 0 < 2 || diferenciaDias === false) {
        return res.redirect("/");
    }

    const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, "direct":true, ...query };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(obtenerVars.ENDPOINT_GETCAR_FROM_CARD_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });


    const dataResponse = await responseRaw.json();

    // TODO: seguridad comprobar que proviene del backend
    if (dataResponse.token !== `sdj&/k.(fk)j#.#$d.a#s%djf.l7).as!#%as/kue#$!.!.#.$!.#$`)
    {
        res.status(404).send("Not found");
        return;
    }
    // const languageBrowser = await CheckLanguage(req.query.idioma);
    // const lenguaje = await locations.GetVarLocales();

    const locationLanguage = await locations.GenerateLocationBrowser(query.idioma);

    const isAvifSupported = await logicHelper.IsAvifSupported(req.get("Accept"));

    if (dataResponse.isOk === false) {
        if (dataResponse.errorFormulario === "") {
            // Blacklist?
            return res.status(404).send("Not found");
        }
        else {
            return res.render(path.join(__dirname, "../../public/inicio.html"),
                {
                    "isAvifSupported": isAvifSupported,
                    "success": query.success,
                    "errorFormulario": dataResponse.errorFormulario,
                    "locations": locationLanguage
                });
        }

    }

    // req.session.data = dataResponse.data;

    if (dataResponse.data.length <= 0) {
        res.render(path.join(__dirname, "../../public/muestraOferta.html"), {
            "isAvifSupported": isAvifSupported,
            "data": dataResponse.data,
            "conductor_con_experiencia": query.conductor_con_experiencia,
            "edad_conductor": query.edad_conductor,
            "anyos_carnet": query.anyos_carnet,
            "fechaRecogida": query.fechaRecogida,
            "horaRecogida": query.horaRecogida,
            "fechaDevolucion": query.fechaDevolucion,
            "horaDevolucion": query.horaDevolucion,
            "numeroDias": query.numeroDias,
            // "formdata": query,
            "errorFormulario": dataResponse.errorFormulario,
            "success": query.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            "locations": locationLanguage

        });
    }
    else {

        // ordenar por precio
        dataResponse.data = await OrdenarPorPrecioTotalDias(dataResponse.data);

        //ordenar por clase vehiculos
        dataResponse.data = await OrdenaPorClaseVehiculos(dataResponse.datosOrdenacion, dataResponse.data)

        //obtener el vehiculo seleccionado
        const vehiculoSeleccionado = await ObtenerVehiculoSeleccionado(dataResponse.data, query.vehiculo);

        res.render(path.join(__dirname, "../../public/muestraOferta.html"), {
            "data": dataResponse.data,
            "isAvifSupported": isAvifSupported,
            "conductor_con_experiencia": query.conductor_con_experiencia ,
            "edad_conductor": query.edad_conductor ,
            "anyos_carnet": query.anyos_carnet ,
            "fechaRecogida": query.fechaRecogida ,
            "horaRecogida": query.horaRecogida ,
            "fechaDevolucion": query.fechaDevolucion ,
            "horaDevolucion": query.horaDevolucion ,
            "numeroDias": query.numeroDias ,
            // "formdata": query,
            "errorFormulario": dataResponse.errorFormulario,
            "success": query.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            "suplementogenerico_base": dataResponse.suplementogenerico_base,
            "suplementotipochofer_base": dataResponse.suplementotipochofer_base,
            "preciosPorClase": dataResponse.preciosPorClase,
            "condicionesgenerales": dataResponse.condicionesgenerales,
            "locations": locationLanguage,
            "vehiculoSeleccionado": vehiculoSeleccionado
        });

    }




};

const sanitizar = async (query, idioma) =>
{

    idioma = await CheckLanguage(idioma);
    let q = querystring.unescape(query).split("?")[1];
    let queryParsed = undefined;
    if (q === undefined)
    {
        let vehiculo = query.split("/")[2].split(".")[0];

        queryParsed = {
            id: `${vehiculo}`,
            success: "EZOP3BCLSJz1NqGXwSZco",
            fase: "2",
            idioma: `${idioma}`,
            vehiculo: `${vehiculo}`,
            fechaRecogida: "",
            horaRecogida: "09:00",
            fechaDevolucion: "",
            horaDevolucion: "20:00",
            conductor_con_experiencia: "on",
            edad_conductor: "25",
            anyos_carnet: "2"
        };

        
    }
    else
    {
        queryParsed = querystring.parse(q, "&", "=", querystring.unescape());
    }

    if (queryParsed.idioma !== undefined)
    {
        const fechaRecogida = await ObtenerCurrentDate(queryParsed.idioma, 1);
        const fechaRetorno = await ObtenerCurrentDate(queryParsed.idioma, 4);
    
        queryParsed["fechaRecogida"] = fechaRecogida;
        queryParsed["horaRecogida"] = "09:00";
    
        queryParsed["fechaDevolucion"] = fechaRetorno;
        queryParsed["horaDevolucion"] = "20:00";
        queryParsed["conductor_con_experiencia"] = "on";
        queryParsed["edad_conductor"] = "25";

    }

    return queryParsed;

};


const CheckLanguage = async (lang) => {

    //por si acaso hay residuos
    if (lang.indexOf("-") !== -1) {
        lang = lang.split("-")[0];
    }

    if (lang !== "es" && lang !== "en" && lang !== "it" && lang !== "de") {
        lang = "en";
    }

    return lang;

};



//2020-01-07T11:28:03.588+00:00
const ObtenerCurrentDate = async (idioma, diaMas) => {

    let date_ob = new Date();
    date_ob.setDate(date_ob.getDate() + diaMas);
    const dia = (date_ob.getDate()) .toString().padStart(2, "00");
    const mes = (date_ob.getUTCMonth() + 1).toString().padStart(2, "00");
    const anyo = date_ob.getUTCFullYear();

    const textoDia = new Intl.DateTimeFormat(idioma, { weekday: 'short' }).format(date_ob);
    const fechaActual = `${textoDia},${dia}-${mes}-${anyo}`;

    return fechaActual;

};

exports.postHome = async (req, res) =>
{
    
    const isSchemaValid = await ControlSchema(req.body);
    
    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("inicio.js control schema invalido");
        return res.status(404).send("Not found");
    }

    const diferenciaDias = await logicDiferenciaFechas.DiferenciaFechaRecogidaDevolucion(req.body);

    if (req.body.edad_conductor - 0 < 21 || req.body.edad_conductor - 0 > 90 || req.body.anyos_carnet - 0 < 2 || diferenciaDias === false)
    {
        return res.redirect("/");
    }
    
    const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, "direct": false, ...req.body };
    
    //enviamos al backedn la informacion
    const responseRaw = await fetch(obtenerVars.URI_API_BACKEND, {
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
    
    const isAvifSupported = await logicHelper.IsAvifSupported(req.get("Accept"));

    const locationLanguage = await locations.GenerateLocationBrowser(req.body.idioma);
    
    if (dataResponse.isOk === false)
    {
        if (dataResponse.errorFormulario === "")
        {
            // Blacklist?
            return res.status(404).send("Not found");
        }
        else
        {
            return res.render(path.join(__dirname, "../../public/inicio.html"),
            {
                "isAvifSupported": isAvifSupported,
                "success": req.body.success,
                "errorFormulario": dataResponse.errorFormulario,
                "locations": locationLanguage
            });
        }
    
    }
    
    // req.session.data = dataResponse.data;
    
    if (dataResponse.data.length <= 0) {
        res.render(path.join(__dirname, "../../public/muestraOferta.html"), {
            "data": dataResponse.data,
            "isAvifSupported": isAvifSupported,
            "conductor_con_experiencia": req.body.conductor_con_experiencia,
            "edad_conductor": req.body.edad_conductor,
            "anyos_carnet": req.body.anyos_carnet,
            "fechaRecogida": req.body.fechaRecogida,
            "horaRecogida": req.body.horaRecogida,
            "fechaDevolucion": req.body.fechaDevolucion,
            "horaDevolucion": req.body.horaDevolucion,
            "numeroDias": req.body.numeroDias,
            // "formdata": req.body,
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
    
        res.render(path.join(__dirname, "../../public/muestraOferta.html"), {
            "data": dataResponse.data,
            "isAvifSupported": isAvifSupported,
            "conductor_con_experiencia": req.body.conductor_con_experiencia,
            "edad_conductor": req.body.edad_conductor,
            "anyos_carnet": req.body.anyos_carnet,
            "fechaRecogida": req.body.fechaRecogida,
            "horaRecogida": req.body.horaRecogida,
            "fechaDevolucion": req.body.fechaDevolucion,
            "horaDevolucion": req.body.horaDevolucion,
            "numeroDias": req.body.numeroDias,
            // "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "success": req.body.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            "suplementogenerico_base": dataResponse.suplementogenerico_base,
            "suplementotipochofer_base": dataResponse.suplementotipochofer_base,
            "preciosPorClase": dataResponse.preciosPorClase,
            "condicionesgenerales": dataResponse.condicionesgenerales,
            "locations": locationLanguage,
            // "pagoRecogida": dataResponse.pagoRecogida
        });
    
    }

};


const ObtenerVehiculoSeleccionado = async (datosOrdenados, vehiculo) =>
{
    for(let i = 0; i < datosOrdenados.length; i++)
    {
        if (datosOrdenados[i]["vehiculo"] === vehiculo)
        {
            return datosOrdenados[i];
        }
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


};



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

exports.OrdenarClaseVehiculos = async (datosOrdenacion, datosVehiculos) => {
    return await OrdenaPorClaseVehiculos(datosOrdenacion, datosVehiculos);
};

exports.OrdenarPorPrecioTotalDias = async (datosvehiculos) => {
    return await OrdenarPorPrecioTotalDias(datosvehiculos);
};

const ControlDirectSchema = async (body) =>
{

    const schema = Joi.object({
        "id": Joi.string(),
        "edad_conductor": Joi.string(),
        "fase": Joi.number(),
        "fechaDevolucion": Joi.string(),
        "fechaRecogida": Joi.string(),
        "horaDevolucion": Joi.string(),
        "horaRecogida": Joi.string(),
        "idioma": Joi.string(),
        "success": Joi.string(),
        "vehiculo": Joi.string(),
        "conductor_con_experiencia": Joi.string(),
        "anyos_carnet": Joi.number(),
        "numeroDias": Joi.number(),

    });


    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };
    const validation = schema.validate(body, options);
    let isValid = false;

    if (validation.error === undefined) {
        isValid = true;
    }

    return isValid;

};


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
        "anyos_carnet": Joi.number().required(),
        "numeroDias": Joi.number(),
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
