
exports.DiferenciaFechaRecogidaDevolucion = async (formulario) => {
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

const ObtenerConversionFecha = async (fechaRaw, horaRaw) => {


    let fechaRecogidaFormSplitted = undefined;
    if (fechaRaw.split(",").length >= 2)
    {
        fechaRecogidaFormSplitted = fechaRaw.split(",")[1].split("-");

    }
    else
    {
        fechaRecogidaFormSplitted = fechaRaw.split("-");
    }

    const anyo = fechaRecogidaFormSplitted[2] - 0;
    let mes = fechaRecogidaFormSplitted[1] - 0;
    const dia = fechaRecogidaFormSplitted[0] - 0;

    // const horaSplitted = horaRaw.split(":");
    // const hora = horaSplitted[0] - 0;


    //comprobar que el mes este entre 0 y 11, dia entre 1 y 30 y 1900-
    if (mes < 1 || mes > 12) {
        console.error("Mes - Conversion erronea");
        const mesRaw = new Date().getMonth();
        mes = mesRaw + 1;
        // return undefined;
    }

    if (anyo < 1900) {
        console.error("Anyo - Conversion erronea");
        return undefined;
    }

    if (dia < 1 || dia > 31) {
        console.error("Dia - Conversion erronea");
        return undefined;
    }

    const fechaRecogida = new Date(`${anyo}-${mes}-${dia} ${horaRaw}:00Z`);

    return fechaRecogida;


};