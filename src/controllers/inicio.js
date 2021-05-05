const express = require('express');
const fetch = require("node-fetch");
const Joi = require("joi");
const nanoid = require("nanoid");

const session = require('express-session');

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/api`;

exports.getHome = async (req, res) =>
{

    const id = nanoid.nanoid();
    return res.render("inicio", {"success": id});

};

exports.postHome = async (req, res) =>
{

    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        res.status(404).send("Not found");
        console.error("schema invalido");
        return;
    }

    const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, ...req.body };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_BACKEND, {
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

    if (dataResponse.isOk === false) {
        if (dataResponse.errorFormulario !== "") {
            return res.render("inicio", 
            {
                "success": req.body.success,
                "errorFormulario": dataResponse.errorFormulario
            });
        }

    }

    req.session.data = dataResponse.data;

    if (dataResponse.data.length <= 0) {
        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "success": req.body.success,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,

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
            "condicionesgenerales": dataResponse.condicionesgenerales
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
        "success": Joi.string().required(),
        fechaDevolucion: Joi.string().required(),
        horaDevolucion: Joi.string().required(),
        fechaRecogida: Joi.string().required(),
        horaRecogida: Joi.string().required(),
        conductor_con_experiencia: Joi.string(),
        edad_conductor: Joi.string().required(),
    });


    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: false // remove unknown props
    };
    const validation = schema.validate(body, options);
    let isValid = false;
    
    if (validation.error === undefined)
    {
        isValid = true;
    } 
    
    return isValid;

}
