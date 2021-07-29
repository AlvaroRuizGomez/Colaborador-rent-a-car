require("dotenv").config();
const logicGetVars = require("./controllers/logicGetVars");
const generar = require("./controllers/generar");

const Init = async () => {
    // unificar el devlopment y production

    // if (process.env.NODE_ENV === "production") {
        //cargando las variables de entorno

        const resultado = await logicGetVars.GetBackendVars();

        await require("./controllers/obtenervariablesentorno").GenerateStaticVars();
        // await generar.GenerarCacheFromInitServer();
        // await generar.ChangeCacheIsSaveable(true);
        const servidor = require("./server");
        servidor.InitServer();

    // }
    // else {
    //     const servidor = require("./server");
    //     servidor.InitServer();
    // }

};

Init();