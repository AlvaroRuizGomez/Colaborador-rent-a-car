const MILISECONDS_DAY = 1000 * 3600 * 24;

exports.DiferenciaFechaRecogidaDevolucion = async (formulario) => {

// http://localhost:8080/car/peugeot807.html?anyos_carnet=3&conductor_con_experiencia=true&edad_conductor=25&fase=2&fechaDevolucion=32-09-2021&fechaRecogida=30-09-2021&horaDevolucion=20%3A00&horaRecogida=09%3A00&id=peugeot807&idioma=en&numeroDias=3&success=BMnO390GIbIIelNNAmwZc&vehiculo=peugeot807


    let resultado = false;
    let diasEntreFechas = 3;
    
    if (formulario.numeroDias === undefined)
    {
        diasEntreFechas = formulario.diasEntreRecogidaDevolucion - 0;
    }
    else
    {
        diasEntreFechas = formulario.numeroDias - 0;
    }

    let [fechaRecogidaFormatoISO, fechaRecogidaFormatoCorto] = await ObtenerConversionFecha(
        formulario.fechaRecogida,
        formulario.horaRecogida,

    );
    
    let [fechaDevolucionFormatoISO, fechaDevolucionFormatoCorto] = await ObtenerConversionFecha(
        formulario.fechaDevolucion,
        formulario.horaDevolucion,
        
    );
        
    if (fechaRecogidaFormatoISO === undefined || fechaRecogidaFormatoISO === undefined)
    {
        
        console.error(`formulario fechaRecogida=${formulario.fechaRecogida} formulario fechaDevolucion=${formulario.fechaDevolucion} fechaRecogida=${fechaRecogidaFormatoISO} fechaDevolucion=${fechaDevolucionFormatoISO}`);

        resultado = false;
        fechaDevolucionFormatoISO = undefined;
        fechaRecogidaFormatoISO = undefined;
    }
    else
    {
        resultado = true;
        if (fechaDevolucionFormatoISO < fechaRecogidaFormatoISO)
        {
            console.error(`FEchaDevolucion es menor a la fechaRecogida fechaDevolucion=${fechaDevolucionFormatoISO} fechaRecogida=${fechaRecogidaFormatoISO}`);
            const tempFecha = fechaRecogidaFormatoISO;
            fechaRecogidaFormatoISO = fechaDevolucionFormatoISO;
            fechaDevolucionFormatoISO = tempFecha;
            // resultado = false;
            // fechaDevolucion = undefined;
            // fechaRecogida = undefined;

            let timeDifference = Math.abs(fechaDevolucionFormatoISO.getTime() - fechaRecogidaFormatoISO.getTime());
            diasEntreFechas = Math.ceil(timeDifference / (MILISECONDS_DAY));

            // console.log(diasEntreFechas);
            
        }
    }
    
    return [resultado, fechaRecogidaFormatoISO, fechaDevolucionFormatoISO, diasEntreFechas, fechaRecogidaFormatoCorto, fechaDevolucionFormatoCorto];

};




const ObtenerConversionFecha = async (fechaRaw, horaRaw) =>
{

    let anyo = undefined;
    let mes = undefined;
    let dia = undefined;

    const [validDate, fechaValidated, hora, minuto] = await ValidateDateFromForm(fechaRaw, horaRaw);
    
    if (fechaRaw === undefined || validDate === false)
    {
        const currentDate = new Date();
        anyo = currentDate.getFullYear();
        mes = currentDate.getMonth() + 1;
        dia = currentDate.getDate();
        
    }
    else
    {

        anyo = fechaValidated.getFullYear();
        mes = fechaValidated.getMonth() + 1;
        dia = fechaValidated.getDate();

    }
    
    // const fechaRecogida = new Date(`${fechaValidated}`);
    // fechaRecogida.setHours(9, 0, 0, 0)
    fechaFormatoISO = new Date(`${anyo}-${mes}-${dia} ${hora}:${minuto}:00Z`);
    fechaFormatoCorto = `${dia}-${mes}-${anyo}`;

    return [fechaFormatoISO, fechaFormatoCorto];


};

const ValidateDateFromForm = async (fechaRaw, horaRaw) =>
{

    //
    


    let isValid = false;
    let [anyo, mes, dia] = await ConversionFecha(fechaRaw, new Date());
    let [hora, minuto] = await ConversionHora(horaRaw);

    let fechaToValidate = new Date(`${anyo} ${mes} ${dia}`);
    if (Object.prototype.toString.call(fechaToValidate) === "[object Date]")
    {
        if (isNaN(fechaToValidate.getTime()) )
        {
            isValid = false;
        }
        else
        {
            isValid = true;
        }
    }
    return [isValid, fechaToValidate, hora, minuto];

};


const ComprobarFechaDentroCorreccion = async (fechaRaw) =>
{

    let isValid = false;
    if (fechaRaw.indexOf(" ") !== -1)
    {
        isValid = true;
    }

    if (fechaRaw.indexOf("-") !== -1) {
        isValid = true;
    }

    if (fechaRaw.indexOf(",") !== -1) {
        isValid = true;
    }

    return isValid;

};

const ConversionFecha = async (fechaRaw, currentDate) =>
{

    try
    {
        // let fechaRecogidaFormSplitted = undefined;
        let anyo = 0;
        let mes = 0;
        let dia = 0;
    
        // fechas validas pueden tener una coma, un espacio, un guion
        if (fechaRaw === undefined || (fechaRaw.indexOf(",") === -1 && fechaRaw.indexOf("-") === -1 && fechaRaw.indexOf(" ") === -1 ))
        {
            const mesRaw = currentDate.getMonth();
            mes = mesRaw + 1;
            anyo = currentDate.getFullYear();
            dia = currentDate.getDate();
    
            return [anyo, mes, dia];
        }
    
        const fechaRecogidaFormSplitted = await SplitFecha(fechaRaw);

        [anyo, mes, dia] = await AjusteFecha(fechaRecogidaFormSplitted);
        return [anyo, mes, dia];

    }
    catch(error)
    {
        console.log("error de conversion en ConversionFecha el error=" + error + " fecharaw=" + fechaRaw);
        const mesRaw = currentDate.getMonth();
        const mes = mesRaw + 1;
        const anyo = currentDate.getFullYear();
        const dia = currentDate.getDate();

        return [anyo, mes, dia];
    }
    

};

const meses = {
    "dec": 12,
    "nov": 11,
    "oct": 10,
    "sep": 9,
    "aug": 8,
    "jul": 7,
    "jun": 6,
    "may": 5,
    "apr": 4,
    "mar": 3,
    "feb": 2,
    "jan": 1,

};

const SplitFecha = async (fechaRaw) =>
{

    let fechaRecogidaFormSplitted;

    if (fechaRaw.indexOf(",") !== -1)
    {
        // Vie, 12-12-20
        fechaRecogidaFormSplitted = fechaRaw.split(",")[1].split("-");
    }
    else
    {
        // Fri Nov 19 2021 00:00:00 GMT+0100 (hora estándar de Europa central)
        if (fechaRaw.indexOf(" ") !== -1)
        {
            const splittedText = fechaRaw.toString().split(" ");
            const anyo = splittedText[3];
            const mesIndex = splittedText[1].toLowerCase();
            const mes = meses[mesIndex];
            const dia = splittedText[2];

            fechaRecogidaFormSplitted = [ dia, mes, anyo ];

        }
        else
        {
            fechaRecogidaFormSplitted = fechaRaw.split("-");
        }

    }

    return fechaRecogidaFormSplitted;

};

const AjusteFecha = async (fechaRecogidaFormSplitted) =>
{


    // let [anyo, mes, dia] = await DateVariablesAsignation(fechaRecogidaFormSplitted);
    

    let anyo = fechaRecogidaFormSplitted[2] - 0;
    let mes = fechaRecogidaFormSplitted[1] - 0;
    let dia = fechaRecogidaFormSplitted[0] - 0;


    //comprobar que el mes este entre 0 y 11, dia entre 1 y 30 y 1900-
    if (mes < 1 || mes > 12) {
        console.error("Mes - Conversion erronea " + mes);
        const mesRaw = currentDate.getMonth();
        mes = mesRaw + 1;
    }

    if (anyo < 1900) {
        console.error("Anyo - Conversion erronea " + anyo);
        anyo = currentDate.getFullYear();
    }

    if (dia < 1 || dia > 31) {
        console.error("Dia - Conversion erronea " + dia);
        dia = currentDate.getDate();
    }

    return [anyo, mes, dia];

};

// const DateVariablesAsignation = async (fechaRecogidaFormSplitted, splittedVars) =>
// {

//     let anyo = 0;
//     let mes = 0;
//     let dia = 0;
    
//     if (splittedVars[ENUM_SPLIT_VARS.guion] === true) {
        
//         anyo = fechaRecogidaFormSplitted[2] - 0;
//         mes = fechaRecogidaFormSplitted[1] - 0;
//         dia = fechaRecogidaFormSplitted[0] - 0;
//     }

//     if (splittedVars[ENUM_SPLIT_VARS.espacio] === true) {

//         let anyo = fechaRecogidaFormSplitted[2] - 0;
//         let mes = fechaRecogidaFormSplitted[1] - 0;
//         let dia = fechaRecogidaFormSplitted[0] - 0;

//     }

//     if (splittedVars[ENUM_SPLIT_VARS.espacio] === true) {

//     }

// };

const ConversionHora = async (horaRaw) => {

    let horaRecogidaFormSplitted = undefined;
    let hora = 9;
    let minuto = 0;

    if (horaRaw.indexOf(":") !== -1)
    {
        horaRecogidaFormSplitted = horaRaw.split(":");
        hora = horaRecogidaFormSplitted[0] - 0;
        minuto = horaRecogidaFormSplitted[1] - 0;
    }

    //comprobar que el mes este entre 0 y 11, dia entre 1 y 30 y 1900-
    if (minuto < 0 || minuto > 59) 
    {
        console.error("Minuto - Conversion erronea " + minuto);
        // const mesRaw = currentDate.();
        minuto = 0;
    }

    if (hora < 0 || hora > 24)
    {
        console.error("Hora - Conversion erronea " + hora);
        hora = 9;
    }

    // const horaTexto = `${hora.toString().padStart(2, "00")}:${minuto.toString().padStart(2, "00")}`;

    return [hora, minuto];

};
