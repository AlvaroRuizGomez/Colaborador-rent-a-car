require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
var compression = require('compression');
const userAgent = require('express-useragent')
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const router = require('./routes/index');
const ejs = require("ejs");
const path = require("path");


const app = express();

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max: 20
});

const allowlist = [ `${process.env.URL_FRONTEND}:${process.env.NODE_EXPRESS_PORT}`];

// Habilitar Cors
// const corsOptions = {
//     origin: (origin, callback) => {
//         const existe = whitelist.some( dominio => dominio === origin);
//         if ( existe ) {
//             callback(null, true)            
//         } else {
//             callback(new Error('No Permitido por CORS'))
//         }
//     }
// };


const corsOptions = (req, callback) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
};



app.use(session({ secret: '12#)#($=!("%""$%#$%/(%)/("asda"SddcdDDF2"!"#$#()=%)!!)"#($$"#"#$', resave: false, saveUninitialized: false }));
app.use(compression());
app.use(userAgent.express())
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//     },
// })
// );


app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(express.json({ limit: '2mb' }));
app.use( cors(corsOptions) );
app.use(morgan('combined'));
app.use(express.static('public'));

app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'html');


app.use('/', apiLimiter);
app.use('/', router);


app.listen(process.env.NODE_EXPRESS_PORT, (error) => {
    if (error) {
        console.error(`[process ${process.pid}] Error ${error} ${process.env.NODE_EXPRESS_PORT}`);
    }
    console.info(`[process ${process.pid}] Listening at port ${process.env.NODE_EXPRESS_PORT}`);
}
);