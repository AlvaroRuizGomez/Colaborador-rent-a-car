const dotenv = require("dotenv");
const fetch = require("node-fetch");

let cacheWeb = undefined;


exports.GetCache = async () =>
{

    const responseRaw = await fetch(URI_VARIABLES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.TOKEN_FOR_BACKEND_ACCESS}`,
        },
        credentials: "include"
    });

    let datos = await responseRaw.json();

    
};