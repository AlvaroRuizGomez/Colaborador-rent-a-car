const crypto = require("crypto");
const path = require("path");
const Joi = require('joi');
const fetch = require("node-fetch");
const geolocation = require("./geolocation");
const locations = require("../controllers/locations");
const obtenerVars = require('./obtenervariablesentorno');
const logicHelper = require("./logicHelper");
const { getHome } = require("./inicio");

// const { post } = require("../routes/route");


exports.getReservar = async (req, res, languageBrowser) => {
    return res.redirect("/");

};

exports.GetCorrecto = async (req, res) => 
{

    return await getHome(req, res, undefined, true);

};

exports.GetNoCorrecto = async (req, res, languageBrowser) => {
    return res.render(path.join(__dirname, "../../public/reservanocompletada.html") );

};



exports.postRealizarReserva = async (req, res, language ) => 
{

    // console.log(req.useragent);
    const isSchemaValid = await ControlSchema(req.body);

    if (isSchemaValid === false) {
        //TODO: mejorar
        console.error("reservar.js control schema invalido");
        return res.status(404).send("Not found");
    }

    const location = await geolocation.GetIPTimeZone(req);
    
    // Bot check
    if (location.agent && location.agent.isBot === true) {
        return res.status(404).send("Not found");
    }

    const body = { 
        "token": process.env.TOKEN_FOR_BACKEND_ACCESS, 
        "useragent": req.useragent,
        "location": location,
        ...req.body
    };

    //enviamos al backedn la informacion
    const responseRaw = await fetch(obtenerVars.URI_REALIZAR_RESERVA_BACKEND, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
    });
    
    const dataResponse = await responseRaw.json();

    if (dataResponse === undefined)
    {

    }



    
    // TODO: seguridad comprobar que proviene del backend
    // if (dataResponse.token !== "")
    // {
    //     return res.status(404).send("Not found");
    // }

    const locationLanguage = await locations.GenerateLocationBrowser(req.body.idioma);

    const isAvifSupported = await logicHelper.IsAvifSupported(req.get("Accept"));

    //{ isOk: resultadoInsercion.isInserted, numeroRegistro: resultadoInsercion.numeroRegistro }

    // if (dataResponse.isOk === false)
    // {
    //     return res.render("inicio",
    //     {
    //         "success": req.body.success,
    //         "errorFormulario": dataResponse.errorFormulario,
    //         "locations": locationLanguage
    //     });
    // }

    res.send(
        {
            "isAvifSupported": isAvifSupported,
            "isOk": dataResponse.isOk,
            "success": req.body.success,
            "locations": locationLanguage,
            "numeroRegistro": dataResponse.numeroRegistro,
            "merchantPayment": dataResponse.merchantPayment
        }
    );
    // res.render("reservacompletada", {
    //     "isOk": dataResponse.isOk,
    //     "success": req.body.success,
    //     "locations": locationLanguage,
    //     "numeroRegistro": dataResponse.numeroRegistro
    // });    

};

exports.PeticionPago = async (req, res) =>
{


    // const dsMerchantParameters = {
    //     "DS_MERCHANT_AMOUNT": "145",
    //     "DS_MERCHANT_CURRENCY": "978",
    //     "DS_MERCHANT_MERCHANTCODE": "999008881",
    //     "DS_MERCHANT_MERCHANTURL": "https://www.rentcarmallorca.es/",
    //     "DS_MERCHANT_ORDER": "1446068581",
    //     "DS_MERCHANT_TERMINAL": "1",
    //     "DS_MERCHANT_TRANSACTIONTYPE": "0",
    //     "DS_MERCHANT_URLKO": "http://www.prueba.com/urlKO.php",
    //     "DS_MERCHANT_URLOK": "http://www.prueba.com/urlOK.php"
    // };

    // const merchantPayment = await CreateMerchantPayment(
    //     req.body,
    //     process.env.MERCHANT_CODE,
    //     process.env.MERCHANT_KEY_CODED
    // );

    // console.log("merchantPayment:" + JSON.stringify(merchantPayment));

    // //enviamos al backedn la informacion
    // const responseRaw = await fetch("https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(merchantPayment)
    // });

    // const datos = await responseRaw.json();
    // console.log("datos=" +  JSON.stringify(datos));
    
    // res.send({datos: datos});

};

exports.NotificacionPago = async (req, res) =>
{

    // console.log("notificaion" + JSON.stringify(req.body));
    // enviar
    const responseRaw = await fetch(obtenerVars.URI_DESCODIFICACION_MERCHANTPARAMETERS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(req.body)
    });

    const datos = await responseRaw.json();

    // console.log("datos=" + JSON.stringify(datos));

};

const ControlSchema = async (body) => 
{

    const schema = Joi.object({
        //--

        descripcion_vehiculo: Joi.string().required(),
        fechaRecogida: Joi.string().required(),
        horaRecogida: Joi.string().required(),
        fechaDevolucion: Joi.string().required(),
        horaDevolucion: Joi.string().required(),
        dias: Joi.number().required(),
        alquiler: Joi.number().required(),
        conductor_con_experiencia: Joi.string().required(),
        total_suplmento_tipo_conductor: Joi.number().required(),
        pagoRecogida: Joi.number().required(),
        pago_online: Joi.number().required(),
        trato: Joi.string().required(),
        numero_sillas_nino: Joi.number().required(),
        numero_booster: Joi.number().required(),
        nombre: Joi.string().required(),
        apellidos: Joi.string().required(),
        email: Joi.string().required(),
        telefono: Joi.string().required(),
        idioma: Joi.string().required(),
        

        //----
        // descripcion_vehiculo: Joi.string().required(),
        // fechaRecogida: Joi.string().required(),
        // horaRecogida: Joi.string().required(),
        // fechaDevolucion: Joi.string().required(),
        // horaDevolucion: Joi.string().required(),
        // dias: Joi.number().required(),
        // alquiler: Joi.number().required(),
        // total_suplmento_tipo_conductor: Joi.number().required(),
        // pagoRecogida: Joi.string().required(),
        // pago_online: Joi.number().required(),
        // titulo: Joi.string().required(),
        // child_seat: Joi.number().required(),
        // booster_seat: Joi.number().required(),
        // conductor_con_experiencia: Joi.string().required(),
        // email: Joi.string().required(),
        // nombre: Joi.string().required(),
        // apellidos: Joi.string().required(),
        // telefono: Joi.string().required(),
        // idioma: Joi.string().required(),

    });

    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };
    const validation = schema.validate(body, options);
    let isValid = false;

    if (validation.error === undefined) {
        isValid = true;
    }

    return isValid;

};



// const CreateMerchantPayment = async (jsonMerchantParameters, codigo, key) => {

    
//     // console.log(
//     //     "Descodificados jsonMerchantParameters:" + JSON.stringify( jsonMerchantParameters )
//     // );

//     const encodecSignature = await createMerchantSignature(process.env.MERCHANT_KEY_CODED, jsonMerchantParameters);
//     console.log("Ds_Signature:" + encodecSignature);
//     const base64MerchantParameters = await createMerchantParameters(jsonMerchantParameters);
//     console.log("Ds_MerchantParameters:" + base64MerchantParameters);

//     return {
//         "Ds_MerchantParameters": base64MerchantParameters,
//         "Ds_Signature": encodecSignature,
//         "Ds_SignatureVersion": "HMAC_SHA256_V1"
//     };

// };


// const encrypt3DES = async (str, key) => {
//     const secretKey = Buffer.from(key, 'base64');
//     const iv = Buffer.alloc(8, 0);
//     const cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
//     cipher.setAutoPadding(false);
//     const relleno = await zeroPad(str, 8);
//     const en_key = cipher.update(relleno, 'utf8', 'binary') + cipher.final('binary');
//     const maxPos = Math.ceil(str.length / 8) * 8;

//     return Buffer.from(en_key.substr(0, maxPos), 'binary').toString('base64');
// };



// const decrypt3DES = async (str, key) => {
//     const secretKey = Buffer.from(key, 'base64');
//     const iv = Buffer.alloc(8, 0);
//     const cipher = crypto.createDecipheriv('des-ede3-cbc', secretKey, iv);
//     cipher.setAutoPadding(false);
//     const relleno = await zeroUnpad(str, 8);
//     const res = cipher.update(relleno, 'base64', 'utf8') + cipher.final('utf8');
//     return res.replace(/\0/g, '');
// }

// const mac256 = async (data, key) => {
//     return crypto.createHmac('sha256', Buffer.from(key, 'base64'))
//         .update(data)
//         .digest('base64');
// }

// const createMerchantParameters = async (data) => {
//     return Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
// }

// const decodeMerchantParameters = async (data) => {
//     const decodedData = JSON.parse(base64url.decode(data, 'utf8'));
//     const res = {};
//     Object.keys(decodedData).forEach((param) => {
//         res[decodeURIComponent(param)] = decodeURIComponent(decodedData[param]);
//     });
//     return res;
// }

// const createMerchantSignature = async (key, data) => {
//     const merchantParameters = await createMerchantParameters(data);
//     const orderId = data.DS_MERCHANT_ORDER;
//     const orderKey = await encrypt3DES(orderId, key);

//     return await mac256(merchantParameters, orderKey);
// }

// const createMerchantSignatureNotif = async (key, data) => {
//     const merchantParameters = decodeMerchantParameters(data);
//     const orderId = merchantParameters.Ds_Order || merchantParameters.DS_ORDER;
//     const orderKey = await encrypt3DES(orderId, key);

//     const res = await mac256(data, orderKey);
//     return base64url.encode(res, 'base64');
// };

// const zeroPad = async (buf, blocksize) => {
//     const buffer = typeof buf === 'string' ? Buffer.from(buf, 'utf8') : buf;
//     const pad = Buffer.alloc((blocksize - (buffer.length % blocksize)) % blocksize, 0);
//     return Buffer.concat([buffer, pad]);
// };


// const zeroUnpad = async (buf, blocksize) => {
//     let lastIndex = buf.length;
//     while (lastIndex >= 0 && lastIndex > buf.length - blocksize - 1) {
//         lastIndex -= 1;
//         if (buf[lastIndex] !== 0) {
//             break;
//         }
//     }
//     return buf.slice(0, lastIndex + 1).toString('utf8');
// };


