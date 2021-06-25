// const dbInterfaces = require("../database/dbInterfaceGetVar");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
// let disponible = false;

// exports.Disponible = async (req, res) =>
// {
//     disponible = req.body.disponible;
// };

exports.GetBackendVars = async () => {

    dotenv.config();

    let port_backend = "";
    let endpoint_variables_frontend = "";
    const protocolo = "http://";
    const host = "localhost";

    if (process.env.LOCAL_SECRETS === "true") {

        port_backend = await readSecret("../../secrets/port_backend.txt");
        endpoint_variables_frontend = await readSecret("../../secrets/endpoint_variables_frontend.txt");

    }
    else {
        port_backend = await readSecret("/run/secrets/PORT_BACKEND");
        endpoint_variables_frontend = await readSecret("/run/secrets/ENDPOINT_VARIABLES_FRONTEND");

    }
    
    
    await esperar(5);
    
    const URI_VARIABLES = `${protocolo}${host}:${port_backend}${endpoint_variables_frontend}`;
    const responseRaw = await fetch(URI_VARIABLES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const datos = await responseRaw.json();

    const buf = Buffer.from(datos.variables);
    const envConfig = dotenv.parse(buf);
    for (const k in envConfig) {
        process.env[k] = envConfig[k]
        // console.log(`${k}:${envConfig[k]}`);
    }

};


// const sleep = async (ms) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });

// };


function esperar() {
    return new Promise((resolve, reject) => {
        //here our function should be implemented 
        setTimeout(() => {

            resolve();
            ;
        }, 3000
        );
    });
}


const readSecret = async (secretNameAndPath) => {
    try {
        const t = path.resolve(__dirname, secretNameAndPath);
        return fs.readFileSync(t, "utf8");
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read the secret: ${secretNameAndPath}. Err: ${err}`);
        } else {
            console.debug(`Could not find the secret ${secretNameAndPath}. Err: ${err}`);
        }
    }
};
