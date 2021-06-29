require("dotenv").config();
const logicGetVars = require("./controllers/logicGetVars");
const logicGetCache = require("./controllers/logicGetCache");

const Init = async () => {
    // unificar el devlopment y production

    if (process.env.NODE_ENV === "production") {
        //cargando las variables de entorno

        const resultado = await logicGetVars.GetBackendVars();
        const resultadoCache = await logicGetCache.GetCache();

        const servidor = require("./server");
        servidor.InitServer();

    }
    else {
        const servidor = require("./server");
        servidor.InitServer();
    }

};

Init();