const fetch = require("node-fetch");

let porcentajeTipoVehiculo = undefined;
const tokenFromFrontend = "sdj&/k.(fk)j#.#$d.a#s%djf.l7).as!#%as/kue#$!.!.#.$!.#$";
const URI_PORCENTAJEVEHICULO = `${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_PORCENTAJE_VEHICULO}`;


exports.GetPorcentajeVehiculos = async () => {

    if (porcentajeTipoVehiculo === undefined)
    {
        await Frontend_TO_Backend();
    }
    
    return porcentajeTipoVehiculo;
};

// const GetPorcentajeVehiculos = async () => {
//     return porcentajeTipoVehiculo;
// };

const Frontend_TO_Backend = async (req, res) =>
{
    const responseRaw = await fetch(URI_PORCENTAJEVEHICULO, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });
    
    const dataResponse = await responseRaw.json();
    if (dataResponse.isOk === false)
    {

    }
    porcentajeTipoVehiculo = dataResponse.datos;
    console.log("seteado porcentipo tipo vehiculo");
    
    if (res !== undefined) {
        res.send({ "isOk": true });
    }



};

exports.Frontend_TO_Backend = async (req, res) => 
{
    await Frontend_TO_Backend(req, res);
};