const fetch = require("node-fetch");
const path = require("path");
const eta = require("eta");
const locations = require("./locations");
const { OrdenarClaseVehiculos, OrdenarPorPrecioTotalDias } = require("./inicio");
const obtenerVars = require("./obtenervariablesentorno");
const template = require("./getTemplate");
const logicGetCache = require("./logicGetCache");



exports.GenerarCacheFromInitServer = async () => {

    let modeloResultados = {
        "en": { "pagina01": "", "pagina02": "" },
        "es": { "pagina01": "", "pagina02": "" },
        "it": { "pagina01": "", "pagina02": "" },
        "de": { "pagina01": "", "pagina02": "" },
    };

    for (let key in modeloResultados)
    {

        for (let keyListadoNombresArchivo in modeloResultados[key])
        {
            let isOk = await GenerateWebCache(key, keyListadoNombresArchivo);
            let errores = {};
            errores["textoError"] = `Cache ${keyListadoNombresArchivo} no generada de forma correcta`;
            errores["isOk"] = false;

            if (isOk.resultado === false) 
            {
                modeloResultados[key][keyListadoNombresArchivo] = errores;
                continue;
            }
            
            if (keyListadoNombresArchivo === "pagina01")
            {
                
                let nombreArchivo = `${template.listadoNombresArchivo[keyListadoNombresArchivo].nombre.split(".")[0]}_cache_${key}.html`;
        
                const respuesta = await template.SaveFileExport(nombreArchivo, isOk.cache);
                if (respuesta === true) {
                    errores["textoError"] = `Cache ${keyListadoNombresArchivo} generada de forma correcta`;
                    errores["isOk"] = true;
                    // textoResultado = { "pagina01": `Cache ${key} generada de forma correcta`, "isOk": true };
                }
                modeloResultados[key][keyListadoNombresArchivo] = errores;

            }
            else
            {
                errores["textoError"] = `Cache ${keyListadoNombresArchivo} generada de forma correcta`;
                errores["isOk"] = true;
                modeloResultados[key][keyListadoNombresArchivo] = errores;
            }

        }

    }

    return modeloResultados;

};





const GenerateWebCache = async (idioma, pagina) => {

    let [uri, pathToHtml, formulario] = await ObtenerConfig(pagina);

    const body = {
        "token": process.env.TOKEN_FOR_BACKEND_CHECK,
        "useragent": undefined,
        "direct": false,
        "location": undefined,
        "id": undefined,
        "formulario": formulario
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });

    const dataResponse = await responseRaw.json();

    if (dataResponse.isOk === false) {
        return { "resultado": dataResponse.isOk };
    }

    
    
    if (pagina === "pagina01")
    {
        dataResponse.data = await OrdenarPorPrecioTotalDias(dataResponse.data);
        dataResponse.data = await OrdenarClaseVehiculos(dataResponse.datosOrdenacion, dataResponse.data)
        const cache = await RealizarPreRender(pagina, dataResponse, pathToHtml, idioma);
    
        return { "resultado": dataResponse.isOk, "cache": cache };
        

    }
    else if (pagina === "pagina02")
    {

        if (await logicGetCache.GetIsSaveable() === false)
        {
            return {
                "resultado": true,
                "cache": undefined,
            };
        }

        const isOk = await logicGetCache.SaveCacheValues(
            dataResponse.cochesPreciosRaw,
            dataResponse.masValorados,
            dataResponse.porcentaje
        );

        await logicGetCache.ChangeIsSaveable(false);
        return {
            "resultado": true,
            "cache": undefined,
        };

    }





};

exports.ChangeCacheIsSaveable = async (estado) =>
{
    await logicGetCache.ChangeIsSaveable(estado);
};

const ObtenerConfig = async (pagina) =>
{

    let uri = undefined;
    let pathToHtml = undefined;
    let formulario = undefined;

    switch (pagina) {
        case "pagina01":
            uri = obtenerVars.URI_GETALL_BACKEND;
            pathToHtml = path.join(__dirname, "../../public/inicio.html");
            
            break;
        case "pagina02":
            uri = obtenerVars.URI_API_BACKEND;
            pathToHtml = path.join(__dirname, "../../public/muestraOferta.html");
            formulario = {
                token: "sdj&/k.(fk)j#.#$d.a#s%djf.l7).as!#%as/kue#$!.!.#.$!.#$",
                direct: false,
                success: undefined,
                idioma: undefined,
                fase: undefined,
                numeroDias: undefined,
                fechaRecogida: undefined,
                horaRecogida: undefined,
                fechaDevolucion: undefined,
                horaDevolucion: undefined,
                conductor_con_experiencia: "on",
                edad_conductor: "22",
                anyos_carnet: "2",
            };
            break;

        case "pagina03":
            uri = obtenerVars.URI_GETALL_BACKEND;
            pathToHtml = path.join(__dirname, "../../public/reservar.html");
            break;
        default:
            uri = obtenerVars.URI_GETALL_BACKEND;
            pathToHtml = path.join(__dirname, "../../public/inicio.html");
            break;
    }

    return [uri, pathToHtml, formulario]

};

const RealizarPreRender = async (pagina, dataResponse,  pathToHtml, idioma) =>
{

    const locationLanguage = await locations.GenerateLocationBrowser(
        idioma,
        undefined
    );

    let obtenerDataRender = {
        "pagina01": {
            "data": dataResponse.data,
            "success": "<%= it.success %>",
            "preciosPorClase": dataResponse.preciosPorClase,
            "locations": locationLanguage,
            "numeroDias": 3
        },
        "pagina02": {
            "conductor_con_experiencia": "<%= it.conductor_con_experiencia %>",
            "edad_conductor": "<% it.edad_conductor %>",
            "anyos_carnet": "<% it.anyos_carnet %>",
            "fechaRecogida": "<%= it.fechaRecogida %>",
            "horaRecogida": "<%= it.horaRecogida %>",
            "fechaDevolucion": "<%= it.fechaDevolucion %>",
            "horaDevolucion": "<%= it.horaDevolucion %>",
            "numeroDias": "<%= it.numeroDias %>",
            "success": "<%= it.success %>",
            "locations": locationLanguage,
            // "formdata": undefined,
            // "data": dataResponse.data,
            // "errorFormulario": dataResponse.errorFormulario,
            // "diasEntreRecogidaDevolucion": dataResponse.diasEntreRecogidaDevolucion,
            // "suplementogenerico_base": dataResponse.suplementogenerico_base,
            // "suplementotipochofer_base": dataResponse.suplementotipochofer_base,
            // "preciosPorClase": dataResponse.preciosPorClase,
            // "condicionesgenerales": dataResponse.condicionesgenerales,
        },
        "pagina03": {}
    };

    if (pagina === "pagina01")
    {
        const dataRender = obtenerDataRender[pagina];
        let archivoMemoria = await template.ReadFileWithPath(pathToHtml);
        
        let templateMemoria = archivoMemoria.
            replaceAll("<% /* cambio-inicio */ %>", "<% /* cambio-inicio").
            replaceAll("<% /* cambio-fin */ %>", "cambio-fin */ %>")
        ;
        await template.SaveFileToPath(pathToHtml, templateMemoria);
        const cacheRaw = await eta.renderFileAsync(pathToHtml, dataRender);
        const cache = cacheRaw.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        
        archivoMemoria = await template.ReadFileWithPath(pathToHtml);
        templateMemoria = archivoMemoria.
            replaceAll("<% /* cambio-inicio", "<% /* cambio-inicio */ %>").
            replaceAll("cambio-fin */ %>", "<% /* cambio-fin */ %>")
            ;
        await template.SaveFileToPath(pathToHtml, templateMemoria);
        
        return cache;
        
    }
    

    

}