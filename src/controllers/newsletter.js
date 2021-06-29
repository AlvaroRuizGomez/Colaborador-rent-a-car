const fetch = require("node-fetch");
const obtenerVars = require("./obtenervariablesentorno");

const ENDPOINT_NEWSLETTER_BACKEND = obtenerVars.ObtenerENDPOINT_NEWSLETTER_BACKEND();

exports.ProcesarEmail = async (req, res) =>
{

    if (req.body.email === undefined)
    {
        return res.status(404).send();
    }

    if (req.body.email === "")
    {
        return res.status(404).send();
    }

    const isValidEmail = await CheckEmail(req.body.email)

    if (isValidEmail === false)
    {
        return res.status(404).send();
    }

    const data = 
    { 
        "email": req.body.email,
        "idioma": req.body.idioma
    };
    
    
    const responseRaw = await fetch(ENDPOINT_NEWSLETTER_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    });

    const dataResponse = await responseRaw.json();

    if (dataResponse.isOk === false)
    {
        // res.status(404).send();
    }
    else
    {
        res.json({"isOk": true});

    }


};


const CheckEmail = async (value) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const m = regex.exec(value);
    let isValid = false;
    if (m !== null) {
        isValid = true;
    }

    return isValid;

};