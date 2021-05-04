const Joi = require('joi');
const fetch = require("node-fetch");

const session = require('express-session');

const URI_BACKEND = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}/reservar`;

exports.getReservar = async (req, res) => {
    return res.redirect("/");

};


exports.postReservar = async (req, res, ) => 
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
    if (dataResponse.token !== "") {

    }

    if (dataResponse.isOk === false)
    {
        if (dataResponse.errorFormulario !== "") {
            return res.render("inicio");
        }

    }


};




const ControlSchema = async (body) => 
{

    const schema = Joi.object({
        vehiculo: Joi.string().required()
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

}

