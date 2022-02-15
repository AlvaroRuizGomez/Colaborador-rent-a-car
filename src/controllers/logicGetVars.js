const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");


exports.GetBackendVars = async () => {

    dotenv.config();

    let port_backend = "";
    let endpoint_variables_frontend = "";
    let token_for_backend = "";
    
    const protocolo = process.env.PROTOCOLO || "http://";
    const host = process.env.URL_BACKEND || "localhost";
    
    if (process.env.LOCAL_SECRETS === "true") {

        port_backend = await readLocalSecret("../../secrets/port_backend.txt") || process.env.PORT_BACKEND;
        endpoint_variables_frontend = await readLocalSecret("../../secrets/endpoint_variables_frontend.txt") || process.env.ENDPOINT_VARIABLES_FRONTEND;
        token_for_backend = await readLocalSecret("../../secrets/token_for_backend.txt") || process.env.TOKEN_FOR_BACKEND_ACCESS;

        // port_backend = process.env.PORT_BACKEND;
        // endpoint_variables_frontend = process.env.ENDPOINT_VARIABLES_FRONTEND;
        // token_for_backend = process.env.TOKEN_FOR_BACKEND_ACCESS;

    }
    else {
        port_backend = await readSecret(`${process.env.SECRET_MOUNT_PATH}/PORT_BACKEND`);
        endpoint_variables_frontend = await readSecret(`${process.env.SECRET_MOUNT_PATH}/ENDPOINT_VARIABLES_FRONTEND`);
        token_for_backend = await readSecret(`${process.env.SECRET_MOUNT_PATH}/TOKEN_FOR_BACKEND_ACCESS`);
        
    }
    
    
    port_backend = port_backend.replace(/[\n\t\r]/g, "");
    token_for_backend = token_for_backend.replace(/[\n\t\r]/g, "");
    endpoint_variables_frontend = endpoint_variables_frontend.replace(/[\n\t\r]/g, "");
        
    await esperar(5);

    try
    {

        const URI_VARIABLES = `${protocolo}${host}:${port_backend}${endpoint_variables_frontend}`;
        // console.log("uri_variable=" + URI_VARIABLES);
    
        const responseRaw = await fetch(URI_VARIABLES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token_for_backend}`,
            },
            credentials: "include"
        });
    
        let datos = await responseRaw.json();
        // console.log(datos);
    
        
        const buf = Buffer.from(datos.variables);
        const envConfig = dotenv.parse(buf);
        let tempEnv = {};
        for (const key in envConfig) {
            
            const variableSanitizada = await sanitizar(envConfig[key]);
            tempEnv[key] = variableSanitizada;
            // console.log(`texto sanitizado=${key}:${variableSanitizada}`);
        }
        process.env = tempEnv;
        return true;
    }
    catch(error)
    {
        return false;

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
        
    }
};




const readSecret = async (secretNameAndPath) => {
    try {
        
        
        const t = fs.readFileSync(secretNameAndPath, "utf8");
        // console.log(`secreto=${t}`)
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