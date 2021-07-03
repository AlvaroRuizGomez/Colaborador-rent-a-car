const urlbackend = process.env.URL_BACKEND || "localhost";
const protocolo = process.env.PROTOCOLO || "http://";

exports.ObtenerURI_API_BACKEND = () =>
{
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_API_BACKEND}`;
};


exports.ObtenerURI_GETALL_BACKEND = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_GETALL_BACKEND}`;
};

exports.ObtenerENDPOINT_GETCAR_FROM_CARD_BACKEND = () =>
{
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_GETCAR_FROM_CARD_BACKEND}`;
};

exports.ObtenerURI_STATS_BACKEND = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_STATS_BACKEND}`;
};


exports.ObtenerURI_UPDATE_STATS_BACKEND = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_UPDATE_STATS_BACKEND}`;
};


exports.ObtenerURI_LOCATIONS = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_LOCATION}`;
};


exports.ObtenerURI_BACKEND_GENERAR_CONDICIONES = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}/generar`;
};

exports.ObtenerENDPOINT_NEWSLETTER_BACKEND = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_NEWSLETTER_BACKEND}`;
};

exports.ObtenerURI_PORCENTAJEVEHICULO = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_PORCENTAJE_VEHICULO}`;
};

exports.ObtenerURI_REALIZAR_RESERVA_BACKEND = () => {
    return `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_RESERVA_BACKEND}`;
};




