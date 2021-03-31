const express = require('express');
const router = express.Router();
const formSchema = require("../schemas/formschema");
const fetch = require("node-fetch");
const session = require('express-session');
const eta = require("eta");
const { abbrev } = require('../schemas/formschema');

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/api`;

// index page
router.get("/", async (req, res) => {
    // console.log(req.useragent);
    res.render("inicio");
});

// index page POST
router.post('/', async (req, res) => {
    
    const isSchemaValid = await ControlSchema( req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        res.status(404).send("Not found");
        console.error("schema invalido");
        return;
    }

    const body = { "token": process.env.TOKEN_FOR_BACKEND_ACCESS, ...req.body};

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
    
    if (dataResponse.isOk === false)
    {
        if (dataResponse.errorFormulario !== "")
        {
            return res.render("inicio", {
                "errorFormulario": dataResponse.errorFormulario
            });
        }

    }
    
    req.session.data = dataResponse.data;

    if (dataResponse.data.length <= 0)
    {
        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion
        });
    }
    else
    {

        // ordenar por precio
        dataResponse.data = await OrdenarPorPrecioTotalDias(dataResponse.data);

        //ordenar por clase vehiculos
        dataResponse.data = await OrdenaPorClaseVehiculos(dataResponse.datosOrdenacion, dataResponse.data)

        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion
        });
        

    }

    
});


const OrdenaPorClaseVehiculos = async (datosOrdenacion, datosVehiculos) =>
{
    let buffer = [];

    // ordenar por claseVehiculo
    for (let j = 0; j < datosOrdenacion.length; j++)
    {
        for (let i = 0; i < datosVehiculos.length; i++)
        {
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

    for (let size = 1; size < longitudDatosVehiculosOrdenados; size *= 2) 
    {
        for (let leftStart = 0; leftStart < longitudDatosVehiculosOrdenados; leftStart += 2 * size) 
        {
            let indiceIzquierda = leftStart;
            let indiceDerecha = Math.min(indiceIzquierda + size, longitudDatosVehiculosOrdenados);
            let limiteIzquierda = indiceDerecha;
            let limiteDerecha = Math.min(indiceDerecha + size, longitudDatosVehiculosOrdenados);
            let i = indiceIzquierda;

            while (indiceIzquierda < limiteIzquierda && indiceDerecha < limiteDerecha) 
            {
                if (datosVehiculosOrdenados[indiceIzquierda].preciototaldias <= datosVehiculosOrdenados[indiceDerecha].preciototaldias)
                {
                    bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceIzquierda++];
                }
                else
                {
                    bufferDatosVehiculos[i++] = datosVehiculosOrdenados[indiceDerecha++];
                }
            }
            
            while (indiceIzquierda < limiteIzquierda) 
            {
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

    const tamanyoBody = Object.keys(body).length;
    if (tamanyoBody <= 0 || tamanyoBody > formSchema.length) return false;

    let isValid = false;
    for (key in body) {
        if (body[key] === "" || body[key] === undefined) {
            return false;
        }

        let schemaValid = isValid = false;
        for (let i = 0; i < formSchema.length; i++) {
            if (key === formSchema[i]) {
                schemaValid = true;
                isValid = true;
                break;
            }
        }

        if (schemaValid === false) {
            return false;
        }

    }

    return isValid;
}


module.exports = router;