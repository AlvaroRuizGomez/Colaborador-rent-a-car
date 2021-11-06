const path = require("path");

exports.URIChallange = async (req, res) => {
    // console.log("acme challange url=" + JSON.stringify(req));

    if (req.url.indexOf("/.well-known/acme-challenge/") === -1)
    {
        return res.send("");
    }

    const url = req.url.split("/.well-known/acme-challenge/")[1];
    return res.send(url);

};


exports.URIChallangeFirstPart = async (req, res) =>
{

    return res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/parteuno"));

};

exports.URIChallangeSecondPart = async (req, res) => {

    return res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/partedos"));

};


exports.URIDetectify = async (req, res) =>
{
    return res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/dcd4d28a1af026de6d64f69376648d30.txt" ));

};