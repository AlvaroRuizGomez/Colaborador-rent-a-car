const Joi = require("joi");
const dbInterfaces = require("../database/dbInterfaces");
const logicStats = require("../logicinterface/logic_stats");
const traducciones = require("../controllers/location");
const fetch = require("node-fetch");
const { transporter } = require("./logicSendEmail");

const URI_EMAIL_ADMIN_API_BACKEND = `${process.env.URI_EMAIL_ADMIN_API_BACKEND}`;
const EMAIL_ADMIN_TOKEN_API = `${process.env.EMAIL_ADMIN_TOKEN_API}`;
const EMAIL_ADMIN_SECRET_TOKEN_API = `${process.env.EMAIL_ADMIN_SECRET_TOKEN_API}`;


const URI_EMAIL_USER_API_BACKEND = `${process.env.URI_EMAIL_USER_API_BACKEND}`;
const EMAIL_USER_TOKEN_API = `${process.env.EMAIL_USER_TOKEN_API}`;
const EMAIL_USER_SECRET_TOKEN_API = `${process.env.EMAIL_USER_SECRET_TOKEN_API}`;

const EMAIL_ADMIN_RECIBIR_RESERVAS_1 = `${process.env.EMAIL_ADMIN_RECIBIR_RESERVAS_1}`;
const EMAIL_ADMIN_RECIBIR_RESERVAS_2 = `${process.env.EMAIL_ADMIN_RECIBIR_RESERVAS_2}`;

const authBase64 = Buffer.from(`${EMAIL_USER_TOKEN_API}:${EMAIL_USER_SECRET_TOKEN_API}`, "utf-8").toString("base64");


// TODO: generar string a partir del secreto
const GenerateTokenBackendToFrontend = async () => {

    return process.env.TOKEN_BACKEND_TO_FRONTEND_SECRET;
};


exports.EnviarCorreos = async (resultadoInsercion, formulario) =>
{

    const traduccion = await traducciones.ObtenerTraduccionEmailUsuario(formulario.idioma);

    if (traduccion === undefined) return;

    let bodyEmail = await ContruirEmailUsuario(resultadoInsercion, formulario, traduccion);

    

    // let data = {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Basic ${authBase64}`,
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: bodyEmail
    // };

    // envio correo usuario
    
    const resultadoUserEmailSended = await EnviarCorreoIo( bodyEmail);
    // const resultadoUserEmailSended = await EnviarCorreoApiJet(URI_EMAIL_USER_API_BACKEND,data);
    
    if (resultadoUserEmailSended.cannotSend === true)
    {
        //TODO: enviarlo a una base de datos para procesar mas tarde
    }
// -------------

    // envio correo administracion
    bodyEmail = await ConstruirEmailAdmins(resultadoInsercion, formulario);

    // data = {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Basic ${authBase64}`,
    //         "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: bodyEmail
    // };

    //envio correo admins
    const resultadoAdminEmailSended = await EnviarCorreoIo(bodyEmail);
    
    const emailsEnviados = {
        "resultadoUserEmailSended": resultadoUserEmailSended,
        "resultadoAdminEmailSended": resultadoAdminEmailSended
    };

    return emailsEnviados;

};

exports.ConfirmacionEmailsEnviados = async (emailsEnviados, objectId) =>
{

    const currentDate = await ObtenerCurrentDate();

    emailsEnviados["fechaEmailsActualizado"] = currentDate;
    emailsEnviados.resultadoUserEmailSended["fechaEmailsActualizado"] = currentDate;
    emailsEnviados.resultadoAdminEmailSended["fechaEmailsActualizado"] = currentDate;

    //buscar por id
    const isUpdated = await dbInterfaces.UpdateReserva(emailsEnviados, objectId);
    console.log(`emails enviados:\n-> Usuarios: ${emailsEnviados.resultadoUserEmailSended.isSended}\n-> Admins: ${emailsEnviados.resultadoAdminEmailSended.isSended}` )

};





const ContruirEmailUsuario = async (resultadoInsercion, formulario, traduccion) =>
{


    
    // .replace("USUARIO", formulario.nombre)
    bodyConfirmacionEmail = traduccion["registro_confirmacion"]
    .replace(new RegExp("USUARIO", 'g'), formulario.nombre)
    .replace(new RegExp("URL_IMAGEN", 'g'), "http://www.rentcarmallorca.es/img/Img-Logo/rentacar_logo_header.png")
    .replace(new RegExp("NOMBRE_MARCA", "g"), "RentcarMallorca")
    .replace(new RegExp("NOMBRE_COCHE", "g"), formulario.descripcion_vehiculo)
    .replace(new RegExp("FECHA_INICIO", "g"), formulario.fechaRecogida)
    .replace(new RegExp("HORA_INICIO", "g"), formulario.horaRecogida)
    .replace(new RegExp("FECHA_FIN", "g"), formulario.fechaDevolucion)
    .replace(new RegExp("HORA_FIN", "g"), formulario.horaDevolucion)
    .replace(new RegExp("NUMERO_REGISTRO", "g"), resultadoInsercion.numeroRegistro)
    .replace(new RegExp("TELEFONO_MARCA", "g"), "9999999")
    .replace(new RegExp("EMAIL_MARCA", "g"), "servicios@rentcarmallorca.es")
    .replace(new RegExp("DIRECCION_MARCA", "g"), "Camino de Can Pastilla, 51")
    .replace(new RegExp("DIRECCION_1_MARCA", "g"), "07610 Can Pastilla - Palma de Mallorca")
    ;

    let bodyEmail = 
    {
        from: 
        {
            name: "Servicios RentCarMallorca.es",
            address: `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`
        },
        to: `${formulario.email}`,
        subject: `${traduccion.suregistro} ${resultadoInsercion.numeroRegistro}`,
        html: `${bodyConfirmacionEmail}`
    };

    // let bodyEmail = JSON.stringify({
    //     "Messages": [
    //         {
    //             "From": {
    //                 "Email": `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`,
    //                 "Name": "Servicios RentcarMallorca.es"
    //             },
    //             "To": [
    //                 {
    //                     "Email": `${formulario.email}`,
    //                     "Name": `${formulario.nombre}`
    //                 }
    //             ],
    //             "Subject": `${traduccion.suregistro} ${resultadoInsercion.numeroRegistro}`,
    //             "HTMLPart": `${ bodyConfirmacionEmail }`
    //         }
    //     ]
    // });

    return bodyEmail;

};

const ConstruirEmailAdmins = async (resultadoInsercion, formulario) =>
{

    let tabla = "";

    for (const key in formulario)
    {
        if (key === "token" || key === "useragent" || key === "location") continue;
        
        tabla += `
        <tr>
            <th>${key}</th>
            <th>${formulario[key]}</th>
        </tr>`;

    }

    let errorEmailSended = "";
    let subject = `Numero Registro: ${resultadoInsercion.numeroRegistro}`;
    if (formulario.isUserEmailSended === false) {
        // mostrar error en el correo
        errorEmailSended = `ATENCION!!!! Ha habido un error al enviar correo al usuario ${formulario.email}`;
        subject = `Problemas! El Numero Registro: ${resultadoInsercion.numeroRegistro} tiene problemas`;

    }

    let html = 
`
<!DOCTYPE html>
<html>
<head>
<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

a
{
    color: black;
}

</style>
</head>
<body>
${errorEmailSended}
Ha llegado una reserva nueva con el numero registro ${resultadoInsercion.numeroRegistro} con los siguientes datos
<br>
<table id="customers">
  ${tabla}
</table>
</body>
</html>
`

    let bodyEmail =
    {
        from: `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`,
        to: `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`,
        subject: `${subject}`,
        html: `${html}`
    };

    // let bodyEmail = {
    //     "Messages": [
    //         {
    //             "From": {
    //                 "Email": `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`,
    //                 "Name": "RentacarMallorca Confirmation"
    //             },
    //             "To": [
    //                 {
    //                     "Email": `${EMAIL_ADMIN_RECIBIR_RESERVAS_1}`,
    //                     "Name": "Admin"
    //                 }
    //             ],
    //             "Subject": `${subject}`,
    //             "HTMLPart": `${html}`
    //         }
    //     ]
    // };

    return bodyEmail;

};

const EnviarCorreoIo = async (data) =>
{

    let isSended = false;
    let incrementalCount = 1;
    let resultadoEnvioEmail =
    {
        "isSended": false,
        "messageId": 0,
        "cannotSend": false
    };

    while (isSended === false) {

        const responseRaw = await transporter.sendMail(data);

        if (responseRaw.messageId !== undefined) {
            
            isSended = true;
            resultadoEnvioEmail["isSended"] = true;
            resultadoEnvioEmail["messageId"] = responseRaw.messageId;
            
        }
        else {
            await sleep(5000 * incrementalCount);
            incrementalCount++;
        }

        if (incrementalCount >= 10) {
            resultadoEnvioEmail["cannotSend"] = true;
            break;
        }
    }

    return resultadoEnvioEmail;



};


const EnviarCorreoApiJet = async (uri, data) =>
{

    let isSended = false;
    let incrementalCount = 1;
    let resultadoEnvioEmail =
    {
        "isSended": false,
        "messageId": 0,
        "messageUUID": 0,
        "cannotSend": false
    };
    
   

    while (isSended === false)
    {
        const responseRaw = await fetch(uri, data);

        const emailIsSended = await responseRaw.json();
        if (emailIsSended.Messages.length > 0)
        {
            if (emailIsSended.Messages[0].Status === "success")
            {
                isSended = true;
                resultadoEnvioEmail["isSended"] = true ;
                resultadoEnvioEmail["messageId"] = emailIsSended.Messages[0].To[0].MessageID;
                resultadoEnvioEmail["messageUUID"] = emailIsSended.Messages[0].To[0].MessageUUID;
            }
        }
        else 
        {
            await sleep(5000 * incrementalCount);
            incrementalCount++;
        }

        if (incrementalCount >= 10)
        {
            resultadoEnvioEmail["cannotSend"] = true;
            break;
        }
    }

    return resultadoEnvioEmail;

};


//2020-01-07T11:28:03.588+00:00
const ObtenerCurrentDate = async () =>
{
    let date_ob = new Date();

    const dia = date_ob.getUTCDate().toString().padStart(2, "00");
    const mes = (date_ob.getUTCMonth() + 1).toString().padStart(2, "00");
    const anyo = date_ob.getUTCFullYear();

    const hora = date_ob.getUTCHours().toString().padStart(2, "00");
    const minutos = date_ob.getUTCMinutes().toString().padStart(2, "00");
    const segundos = date_ob.getUTCSeconds().toString().padStart(2, "00");;
    const ms = date_ob.getUTCMilliseconds().toString().padStart(2, "00");

    const cadena = `${anyo}-${mes}-${dia}T${hora}:${minutos}:${segundos}:${ms}`;

    return cadena;

};


const ObtenernumeroRegistro = async () =>
{

    let date_ob = new Date();
    const dia = date_ob.getDate().toString().padStart(2, "00");
    const mes = (date_ob.getMonth() + 1).toString().padStart(2, "00");
    const anyo = date_ob.getFullYear();

    const cadenaComprobarDia = `${anyo}:${mes}:${dia}`;
    const cantidadReservasDia = await dbInterfaces.ConsultarCantidadReservasDia(cadenaComprobarDia);

    const numeroRegistro = `${anyo}-${mes}-${dia}--${cantidadReservasDia}`;

    return numeroRegistro;

};

exports.ProcesarReserva = async (formulario, currentDate) =>
{

    const numeroRegistro = await ObtenernumeroRegistro();
    
    formulario["numeroRegistro"] = numeroRegistro;
    
    formulario = await SanitizarFormulario(formulario);

    let isInserted = false;
    let incrementalCount = 1;
    while (isInserted === false)
    {
        result = await dbInterfaces.ProcesarReserva(formulario);
        isInserted = result.isInserted;
        if (isInserted === false)
        {
            await sleep(5000 * incrementalCount);
            incrementalCount++;
        }
    }
    return { "isInserted": isInserted, "objectId": result.objectId, "numeroRegistro": numeroRegistro};

};


const SanitizarFormulario = async (formulario) =>
{
    
    //quitar mayusculas, espacios, o caracteres no permitidos
    formulario["email"] = formulario["email"].trim().toLowerCase();
    formulario["telefono"] = formulario["telefono"].trim().toLowerCase();

    return formulario;

};

const sleep = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

};


exports.CheckTokenPostForm = async (formulario) => {

    const schema = Joi.object({
        token: Joi.string().required(),
        useragent: Joi.object().required(),
        location: Joi.object().required(),
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
        

    });

    const [respuesta, formularioChecked] = await CheckTokenControlSchema(formulario, schema);

    return [respuesta, formularioChecked];

};

const CheckTokenControlSchema = async (formulario, schema) => {

    let respuesta = {};

    const isTokenValid = await CheckToken(formulario.token, dbInterfaces.tokenFromFrontend);
    respuesta["isTokenValid"] = isTokenValid;

    if (isTokenValid === false) {
        return [respuesta, formulario];
    }

    // TODO: generar string a partir del secreto
    formulario["token"] = await GenerateTokenBackendToFrontend();
    if (formulario.conductor_con_experiencia === undefined) {
        formulario["conductor_con_experiencia"] = "off";
    }

    const currentDate = await ObtenerCurrentDate();
    formulario["fechaAlta"] = currentDate;

    respuesta["isSchemaValid"] = await ControlSchema(formulario, schema);

    return [respuesta, formulario];

};


const CheckToken = async (token, tokenFromFrontend) => {

    let isValid = false;

    if (token === tokenFromFrontend) {
        isValid = true;
    }

    return isValid;
};

const ControlSchema = async (body, schema) => {

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: false // remove unknown props
    };
    const validation = schema.validate(body, options);
    let isValid = false;

    if (validation.error === undefined) {
        isValid = true;
    }

    return isValid;

};



exports.SumarVisitaVehiculo = async (vehiculo) =>
{

    const resultado = await dbInterfaces.SumarVisitaVehiculo(vehiculo);
    return resultado;

};


exports.AñadirEstadisticas = async (formulario) =>
{

    const resultado = await logicStats.AñadirEstadisticas(formulario);
    
};



exports.ActualizarEstadisticas = async (formulario) => {

    const resultado = await logicStats.ActualizarEstadisticas(formulario);


    // const resultado = await logicStats.ActualizarEstadisticas(formulario);



};
