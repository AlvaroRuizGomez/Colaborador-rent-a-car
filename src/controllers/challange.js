const path = require("path");

exports.URIChallangeFirstPart = async (req, res) =>
{
    res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/parteuno"));
    
};

exports.URIChallangeSecondPart = async (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/partedos"));

};


