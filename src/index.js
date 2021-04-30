require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const eta = require("eta");
const compression = require('compression');
const userAgent = require('express-useragent')
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const router = require('./routes/route');
const path = require("path");


const app = express();

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max: 20
});

const allowlist = [ `${process.env.URL_FRONTEND}:${process.env.NODE_EXPRESS_PORT}`];

// Habilitar Cors
const corsOptions = (req, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
};

// politicas de seguridad
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//     },
// })
// );

// configuracion
app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }));
app.use(compression());
app.use(userAgent.express());

app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(express.json({ limit: '2mb' }));
app.use( cors(corsOptions) );
app.use(morgan('combined'));

//registro de html como eta
app.engine(".html", eta.renderFile);
app.set("views", path.join(__dirname, "../public"));
app.set("view engine", "html");

app.use("/", express.static('public'));


// rutas
app.use("/", apiLimiter);
app.use("/", router);

// escucha puerto servidor
app.listen(process.env.NODE_EXPRESS_PORT, (error) => {
    if (error) {
        console.error(`[process ${process.pid}] Error ${error} ${process.env.NODE_EXPRESS_PORT}`);
    }
    console.info(`[process ${process.pid}] Listening at port ${process.env.NODE_EXPRESS_PORT}`);
}
);




