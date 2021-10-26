const path = require("path");

exports.URIChallange = async (req, res) => {
    console.log("acme challange url" + req.url);

    if (req.url.indexOf("/.well-known/acme-challenge/") === -1)
    {
        return res.send("");
    }

    const url = req.url.split("/.well-known/acme-challenge/")[1];
    return res.send(url);
    // return res.sendFile(path.join(__dirname, "../../public/.well-known/acme-challange/parteuno"));

};




