const express = require('express');
const router = express.Router();
const formSchema = require("../schemas/formschema");
const fetch = require("node-fetch");
const session = require('express-session');
const eta = require("eta");

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/api`;

// index page
router.get("/", async (req, res) => {
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


    if (dataResponse.errorFormulario !== "")
    {
        return res.render("inicio", {
            "errorFormulario": dataResponse.errorFormulario
        });
    }
    
    req.session.data = dataResponse.data;
    res.render("muestraOferta", {
        "data": dataResponse.data,
        "formdata": req.body,
        "errorFormulario": dataResponse.error,
        "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion
    });
    // res.redirect(301, `/muestraoferta/${req.sessionID}`);
    
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