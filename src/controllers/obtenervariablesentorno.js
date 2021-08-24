const urlbackend = process.env.URL_BACKEND || "localhost";
const protocolo = process.env.PROTOCOLO || "http://";

exports.URI_LOCATIONS = undefined;
exports.URI_UPDATE_STATS_BACKEND = undefined;
exports.URI_STATS_BACKEND = undefined;
exports.ENDPOINT_GETCAR_FROM_CARD_BACKEND = undefined;
exports.URI_API_BACKEND = undefined;
exports.URI_GETALL_BACKEND = undefined;
exports.URI_BACKEND_GENERAR_CONDICIONES = undefined;
exports.ENDPOINT_NEWSLETTER_BACKEND = undefined;
exports.URI_PORCENTAJEVEHICULO = undefined;
exports.URI_REALIZAR_RESERVA_BACKEND = undefined;
exports.URI_REALIZAR_PAGO_BACKEND = undefined;
exports.URI_DESCODIFICACION_MERCHANTPARAMETERS = undefined;


exports.GenerateStaticVars = async () =>
{
    this.URI_LOCATIONS = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_LOCATION}`;
    this.URI_UPDATE_STATS_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_UPDATE_STATS_BACKEND}`;
    this.URI_STATS_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_STATS_BACKEND}`;
    this.ENDPOINT_GETCAR_FROM_CARD_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_GETCAR_FROM_CARD_BACKEND}`;
    
    this.URI_API_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_API_BACKEND}`;
    this.URI_GETALL_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_GETALL_BACKEND}`;
    this.URI_BACKEND_GENERAR_CONDICIONES = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}/generar`;
    this.ENDPOINT_NEWSLETTER_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_NEWSLETTER_BACKEND}`;
    this.URI_PORCENTAJEVEHICULO = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_PORCENTAJE_VEHICULO}`;
    this.URI_REALIZAR_RESERVA_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_RESERVA_BACKEND}`;

    this.URI_REALIZAR_PAGO_BACKEND = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_REALIZAR_PAGO_BACKEND}`;
    this.URI_DESCODIFICACION_MERCHANTPARAMETERS = `${protocolo}${urlbackend}:${process.env.PORT_BACKEND}${process.env.ENDPOINT_DESCODIFICACION_MERCHANTPARAMETERS}`;

};



