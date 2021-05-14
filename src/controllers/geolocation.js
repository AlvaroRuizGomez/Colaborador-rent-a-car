const geolite = require('geoip-lite');

exports.GetIPTimeZone = async (req) => {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (ip.includes(',')) {
        ip = ip.substring(0, ip.indexOf(','));
    }

    let dataGeo = geolite.lookup(ip)
    if (!dataGeo) {
        dataGeo = { timezone: '', agent: { isBot: false } };
    }

    dataGeo["ip"] = ip;

    return dataGeo;

};

