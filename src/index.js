require("dotenv").config();
const logicGetVars = require("./controllers/logicGetVars"); 
const generar = require("./controllers/generar"); // control para generar las caches de los html

const Init = async () => {

    const resultado = await logicGetVars.GetBackendVars();
    if (resultado === false)
    {
        console.log("No posible recoger Backend Vars");
        return;
    }

    await require("./controllers/obtenervariablesentorno").GenerateStaticVars();
    // await generar.GenerarCacheFromInitServer();
    // await generar.ChangeCacheIsSaveable(true);
    const servidor = require("./server");
    servidor.InitServer();

};

Init();