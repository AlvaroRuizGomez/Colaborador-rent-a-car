let cochesPreciosRaw;
let masValorados;
let porcentaje;
let isSaveable = true;

exports.GetIsSaveable = async () =>
{
    return isSaveable;
}

exports.ChangeIsSaveable = async (estado) => {
    isSaveable = estado;
}



exports.GetCacheCochesPreciosRaw = async () =>
{
    return cochesPreciosRaw;

};

exports.GetCacheMasValorados = async () => {

    return masValorados;

};

exports.GetCachePorcentaje = async () => {

    return porcentaje;

};

exports.SaveCacheValues = async (saveCochesPrecios, saveMasValorados, savePorcentaje) =>
{
    cochesPreciosRaw = saveCochesPrecios;
    masValorados = saveMasValorados;
    porcentaje = savePorcentaje;

    return true;

}

// exports.GetCache = async () =>
// {
    
//     // const protocolo = process.env.PROTOCOLO || "http://";
//     // const host = process.env.URL_BACKEND || "localhost";
//     // const endpoint_web_cache = process.env.ENDPOINT_CACHE;

//     // const URI_WEB_CACHE = `${protocolo}${host}:${port_backend}${endpoint_web_cache}`;
//     // const responseRaw = await fetch(URI_WEB_CACHE, {
//     //     method: "GET",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         "Authorization": `${process.env.TOKEN_FOR_BACKEND_ACCESS}`,
//     //     },
//     //     credentials: "include"
//     // });

//     // let datos = await responseRaw.json();



    
// };