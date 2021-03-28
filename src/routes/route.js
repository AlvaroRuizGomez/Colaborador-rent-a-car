const express = require('express');
const router = express.Router();
const formSchema = require("../schemas/formschema");
const fetch = require("node-fetch");
const session = require('express-session');
const eta = require("eta");

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


    //enviamos al backedn la informacion
    const responseRaw = await fetch(URI_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(req.body)
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
        res.render("muestraOferta", {
            "data": dataResponse.data,
            "formdata": req.body,
            "errorFormulario": dataResponse.errorFormulario,
            "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion
        });
        

    }

    
});


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