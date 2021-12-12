const path = require("path");
const fs = require("fs");

exports.URIChallange = async (req, res) => {

    try {

        const directory = path.join(process.cwd(), "./acmechallenge/.well-known/acme-challenge/");
        const files = fs.readdirSync(directory);

        for (let i = 0; i < files.length; i++)
        {
            return res.sendFile(directory + files[i]);
        }
        
    } catch (err) {
        console.log(err);
    }
    
    return res.send("");

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