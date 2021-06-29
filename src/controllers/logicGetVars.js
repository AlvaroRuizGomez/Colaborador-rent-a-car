const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");


exports.GetBackendVars = async () => {

    dotenv.config();

    let port_backend = "";
    let endpoint_variables_frontend = "";
    
    const host = process.env.URL_BACKEND || "localhost";
    const protocolo = "http://";
    
    if (process.env.LOCAL_SECRETS === "true") {

        port_backend = await readLocalSecret("../../secrets/port_backend.txt");
        endpoint_variables_frontend = await readLocalSecret("../../secrets/endpoint_variables_frontend.txt");

    }
    else {
        port_backend = await readSecret("/run/secrets/PORT_BACKEND");
        endpoint_variables_frontend = await readSecret("/run/secrets/ENDPOINT_VARIABLES_FRONTEND");

    }
    
    // console.log("port_backend=" + port_backend);
    // port_backend = port_backend.replace("%0A", "");
    // port_backend = port_backend.replace("%0a", "");
    // port_backend = port_backend.replace(" ", "");
    // port_backend = port_backend - 0;
    // console.log("port_backend=" + port_backend);

    // console.log("endpoint_variables_frontend=" + endpoint_variables_frontend);
    // endpoint_variables_frontend = endpoint_variables_frontend.replace("%0A", "");
    // console.log("endpoint_variables_frontend=" + endpoint_variables_frontend);
    // endpoint_variables_frontend = endpoint_variables_frontend.replace("%0a", "");
    // console.log("endpoint_variables_frontend=" + endpoint_variables_frontend);
    // endpoint_variables_frontend = endpoint_variables_frontend.trim();
    // console.log("endpoint_variables_frontend=" + endpoint_variables_frontend);
    
    await esperar(5);
    
    const URI_VARIABLES = `${protocolo}${host}:${port_backend}${endpoint_variables_frontend}`;
    console.log("uri_variable=" + URI_VARIABLES);

    const responseRaw = await fetch(URI_VARIABLES, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.TOKEN_FOR_BACKEND_ACCESS}`,
        },
        credentials: "include"
    });

    let datos = await responseRaw.json();
    // console.log(datos);

    
    const buf = Buffer.from(datos.variables);
    const envConfig = dotenv.parse(buf);
    for (const key in envConfig) {
        
        const variableSanitizada = await sanitizar(envConfig[key]);
        process.env[key] = variableSanitizada;
        console.log(`texto sanitizado=${key}:${variableSanitizada}`);
    }

};

const sanitizar = async (textoSinSanitizar) =>
{

    const textoSanitizado = textoSinSanitizar.replace("\n", "");
    return textoSanitizado;

};


function esperar() {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {

            resolve();
            ;
        }, 3000
        );
    });
}


const readLocalSecret = async (secretNameAndPath) => {
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




const readSecret = async (secretNameAndPath) => {
    try {
        
        // return fs.readFileSync(secretNameAndPath, "utf8");
        const t = fs.readFileSync(secretNameAndPath, "utf8");
        console.log(`secreto=${t}`)
        return t;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`An error occurred while trying to read the secret: ${secretNameAndPath}. Err: ${err}`);
        } else {
            console.debug(`Could not find the secret ${secretNameAndPath}. Err: ${err}`);
        }
    }
};