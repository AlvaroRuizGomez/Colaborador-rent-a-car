const express = require('express');
const router = express.Router();
const formSchema = require("../schemas/formschema");
const fetch = require("node-fetch");
const session = require('express-session');
const ejs = require("ejs");

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/api`;

// index page
router.get('/', (req, res) => {
    res.render('index.html', { title: 'Home Page' })
});


// index page POST
router.post('/', async (req, res, next) => {
    
    const isSchemaValid = await ControlSchema( req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        res.send({ "data": "" });
        console.error("schema invalido")
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

    req.session.data = dataResponse;
    console.log("redirect");
    res.redirect(301, `/muestraoferta`);
    next;

});

router.get("/muestraoferta", async (req, res) => {
    
    console.log("muestraoferta");
    const sessionData = req.session.data;
    res.render('muestraOferta.html', {sessionData} );
    // res.renderFile("muestraOferta.html")


    
});


const ControlSchema = async (body) => {


    for (key in body) {
        if (body[key] === "" || body[key] === undefined) {
            return false;
        }


        let schemaValid = false;
        for (let i = 0; i < formSchema.length; i++) {
            if (key === formSchema[i]) {
                schemaValid = true;
                break;
            }
        }

        if (schemaValid === false) {
            return false;
        }

    }

    return true;
}


module.exports = router;