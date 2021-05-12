const fetch = require("node-fetch");
let locales = undefined;
const tokenFromFrontend = "sdj&/k.(fk)j#.#$d.a#s%djf.l7).as!#%as/kue#$!.!.#.$!.#$";
const URI_LOCATIONS = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_LOCATION}`;


exports.Frontend_TO_Backend = async (req, res) =>
{

    const responseRaw = await fetch(URI_LOCATIONS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const dataResponse = await responseRaw.json();
    locales = dataResponse.datos;
    console.log("seteado los locales");

    res.send({"isOk": true});

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

    return locales;
};

// module.exports = { locales, GenerarLocations, Frontend_TO_Backend } ;