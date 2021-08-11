const path = require("path");

exports.URIChallange = async (req, res) =>
{
    res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/texto"));
    
};


