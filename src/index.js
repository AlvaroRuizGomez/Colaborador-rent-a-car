require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
var compression = require("compression");
const userAgent = require("express-useragent");
const rateLimit = require("express-rate-limit");
const dbInterfaces = require("./database/dbInterfaces");

// TODO: leer desde db
// if (process.env.NODE_ENV === "production") {
    
//     console.log(`puerto: ${process.env.REDISDB_PORT}`);
//     const logicGetVars = require("./logicinterface/logicGetVars");
//     const resultado = logicGetVars.GetBackendVars();

// }

// --- conexion base de datos
dbInterfaces.ConnectDB();

const router = require("./routes/routes");
const cookieParser = require("cookie-parser");



const app = express();

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1min
    max: 20
});

app.use(cookieParser());
app.use(compression());
app.use(userAgent.express());
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use(morgan("combined"));


app.use("/", apiLimiter);
app.use("/", router);



app.listen(process.env.PORT_BACKEND, (error) => {
        if (error) {
            console.error(`[process ${process.pid}] Error ${error} ${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}`);
        }
    console.info(`[process ${process.pid}] Listening at ${process.env.URL_BACKEND}:${process.env.PORT_BACKEND}`);
    }
);

module.exports = app