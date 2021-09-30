
exports.DiferenciaFechaRecogidaDevolucion = async (formulario) => {


    //https://www.rentcarmallorca.es/car/citroenC3.html?id=citroenC3\u0026success=Can7Ed63YEPpAgTZAM_8f\u0026fase=2\u0026idioma=en\u0026vehiculo=citroenC3\u0026fechaRecogida=22-22-2021\u0026horaRecogida=09:00\u0026fechaDevolucion=24-22-2021\u0026horaDevolucion=20:00\u0026conductor_con_experiencia=true\u0026edad_conductor=25\u0026anyos_carnet=3\u0026numeroDias=3

    // formulario = await sanitizarFormulario(formulario);

    const fechaRecogida = await ObtenerConversionFecha(
        formulario.fechaRecogida,
        formulario.horaRecogida,

    );

    if (fechaRecogida === undefined) {
        //TODO: mejorar con un redirect etc
        console.error("schema invalido")
        return false;
    }

    let fechaDevolucion = await ObtenerConversionFecha(
        formulario.fechaDevolucion,
        formulario.horaDevolucion,

    );

    if (fechaDevolucion === undefined) {
        //TODO: mejorar con un redirect etc
        console.error("schema invalido")
        return false;
    }

    // comprobar que fechaDevolucion es mayor a la fechaRecogida
    if (fechaDevolucion < fechaRecogida) {
        console.error("FEchaDevolucion es menor a la fechaRecogida");
        return false;
    }

    // const milisecondsEntreRecogidaDevolucion = fechaDevolucion - fechaRecogida;
    // const diasEntreRecogidaDevolucion = Math.round(milisecondsEntreRecogidaDevolucion / DAY_IN_MILISECONDS);

    // console.log("dias=" + diasEntreRecogidaDevolucion);

    return true;
};


const ObtenerConversionFecha = async (fechaRaw, horaRaw) =>
{

    let anyo = undefined;
    let mes = undefined;
    let dia = undefined;

    const currentDate = new Date();

    if (fechaRaw === undefined)
    {
        anyo = currentDate.getFullYear();
        mes = currentDate.getMonth() + 1;
        dia = currentDate.getDate();
        
    }
    else
    {
        [anyo, mes, dia] = await conversionFecha(fechaRaw, currentDate);
    }

    const fechaRecogida = new Date(`${anyo}-${mes}-${dia} ${horaRaw}:00Z`);

    return fechaRecogida;


};

const conversionFecha = async (fechaRaw, currentDate) =>
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
        console.error("Mes - Conversion erronea");
        const mesRaw = currentDate.getMonth();
        mes = mesRaw + 1;
    }

    if (anyo < 1900) {
        console.error("Anyo - Conversion erronea");
        anyo = currentDate.getFullYear();
    }

    if (dia < 1 || dia > 31) {
        console.error("Dia - Conversion erronea");
        dia = currentDate.getDate();
    }

    return [anyo, mes, dia];

};