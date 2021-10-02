
exports.DiferenciaFechaRecogidaDevolucion = async (formulario) => {



    // http://localhost:8080/car/suzukyBurgman125.html?id=suzukyBurgman125&success=GgxjggDbBgV88lT3d7dO5&fase=2&idioma=en&vehiculo=suzukyBurgman125&fechaRecogida=29-09-2021&horaRecogida=09:00&fechaDevolucion=31-09-2021&horaDevolucion=20:00&conductor_con_experiencia=true&edad_conductor=25&anyos_carnet=3&numeroDias=3
    let resultado = false;

    let fechaRecogida = await ObtenerConversionFecha(
        formulario.fechaRecogida,
        formulario.horaRecogida,

    );
    
    let fechaDevolucion = await ObtenerConversionFecha(
        formulario.fechaDevolucion,
        formulario.horaDevolucion,
        
    );
        
    if (fechaRecogida === undefined || fechaRecogida === undefined)
    {
        
        console.error(`formulario fechaRecogida=${formulario.fechaRecogida} formulario fechaDevolucion=${formulario.fechaDevolucion} fechaRecogida=${fechaRecogida} fechaDevolucion=${fechaDevolucion}`);

        resultado = false;
        fechaDevolucion = undefined;
        fechaRecogida = undefined;
    }
    else
    {
        resultado = true;
        if (fechaDevolucion < fechaRecogida)
        {
            console.error(`FEchaDevolucion es menor a la fechaRecogida fechaDevolucion=${fechaDevolucion} fechaRecogida=${fechaRecogida}`);
            resultado = false;
            fechaDevolucion = undefined;
            fechaRecogida = undefined;
            
        }
    }
    
    return [resultado, fechaRecogida, fechaDevolucion];

};


const ObtenerConversionFecha = async (fechaRaw, horaRaw) =>
{

    let anyo = undefined;
    let mes = undefined;
    let dia = undefined;

    const currentDate = new Date();
    const [validDate, fechaValidated, hora, minuto] = await ValidateDateFromForm(fechaRaw, horaRaw);
    
    if (fechaRaw === undefined || validDate === false)
    {
        anyo = currentDate.getFullYear();
        mes = currentDate.getMonth() + 1;
        dia = currentDate.getDate();
        
    }
    else
    {

        anyo = fechaValidated.getFullYear();
        mes = fechaValidated.getMonth() + 1;
        dia = fechaValidated.getDate();

        // [anyo, mes, dia] = await conversionFecha(fechaRaw, currentDate);
    }
    
    // const fechaRecogida = new Date(`${fechaValidated}`);
    // fechaRecogida.setHours(9, 0, 0, 0)
    fechaRecogida = new Date(`${anyo}-${mes}-${dia} ${hora}:${minuto}:00Z`);

    return fechaRecogida;


};

const ValidateDateFromForm = async (fechaRaw, horaRaw) =>
{

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

const ConversionFecha = async (fechaRaw, currentDate) =>
{

    let fechaRecogidaFormSplitted = undefined;
    if (fechaRaw.split(",").length >= 2) {
        fechaRecogidaFormSplitted = fechaRaw.split(",")[1].split("-");
    }
    else {
        fechaRecogidaFormSplitted = fechaRaw.split("-");
    }

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
