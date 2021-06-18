const urlbackend = process.env.URL_BACKEND || "localhost";
const protocolo = "http://";

exports.ObtenerURI_API_BACKEND = async () =>
{
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_API_BACKEND}`;
};


exports.ObtenerURI_GETALL_BACKEND = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_GETALL_BACKEND}`;
};

exports.ObtenerURI_STATS_BACKEND = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_STATS_BACKEND}`;
};


exports.ObtenerURI_UPDATE_STATS_BACKEND = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_UPDATE_STATS_BACKEND}`;
};


exports.ObtenerURI_LOCATIONS = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_LOCATION}`;
};


exports.ObtenerURI_BACKEND_GENERAR_CONDICIONES = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}/generar`;
};

exports.ObtenerENDPOINT_NEWSLETTER_BACKEND = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_NEWSLETTER_BACKEND}`;
};

exports.ObtenerURI_PORCENTAJEVEHICULO = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_PORCENTAJE_VEHICULO}`;
};

exports.ObtenerURI_REALIZAR_RESERVA_BACKEND = async () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_RESERVA_BACKEND}`;
};


`${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_RESERVA_BACKEND}`



