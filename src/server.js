let app = undefined;

exports.InitServer = async () => 
{

    require("dotenv").config();
    // const cors = require("cors");
    // const morgan = require("morgan");
    // const helmet = require("helmet");
    const express = require("express");
    // const session = require('express-session');
    const eta = require("eta");
    var compression = require("compression");
    const userAgent = require("express-useragent")
    // const rateLimit = require("express-rate-limit");
    const router = require("./routes/router");
    const path = require("path");

    const app = express();

    // const apiLimiter = rateLimit({
    //     windowMs: 1 * 60 * 1000, //1min
    //     max: 20
    // });

    // const allowlist = [`${process.env.URL_FRONTEND}:${process.env.PORT_BACKEND}`];

    // app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }));
    app.use(compression());
    // app.use(userAgent.express())
    // app.use(helmet());
    app.use(express.urlencoded({ extended: true, limit: "2mb" }));
    app.use(express.json({ limit: "2mb" }));
    // app.use(cors({
    //     credentials: true,
    //     origin: allowlist
    // }));
    // app.use(morgan("combined"));



    //registro de html como eta
    app.engine(".html", eta.renderFile);
    app.set("views", path.join(__dirname, "../public"));

    app.set("view engine", "html");
    app.use("/", router);
    // app.use("/", express.static(path.join(__dirname, "../public")));
    // app.use(express.static('public'))
    
    // app.use(`/${process.env.ENDPOINT_FRONTEND_PANEL_CONTROL}/dashboard`, express.static(path.join(__dirname, "../public")));
    // app.use(`/`, express.static(path.join(__dirname, "../public")));
    // app.use(`/0_QJFs2NH9a_f_a_BQ_NTib_Y3O6Ik_DkWIiW_mFtZSI/dashboard/traducciones`, express.static(path.join(__dirname, "../public")));
    app.use(`/0_QJFs2NH9a_f_a_BQ_NTib_Y3O6Ik_DkWIiW_mFtZSI/dashboard`, express.static(path.join(__dirname, "../public")));
    app.use(`/0_QJFs2NH9a_f_a_BQ_NTib_Y3O6Ik_DkWIiW_mFtZSI/dashboard/js/hojacalculo`, express.static(path.join(__dirname, "../public")));

    const express_server = app.listen(3100, (error) => {
            if (error) {
                console.error(`[process ${process.pid}] Error ${error} 3100`);
            }
        console.info(`[process ${process.pid}] Listening at port 3100`);
        }
    );

    process.on("SIGINT", function onSigint() {
        console.info("Got SIGINT (aka ctrl-c in docker). Graceful shutdown ", new Date().toISOString());
        shutdown();
    });

    process.on("SIGTERM", function onSigterm() {
        console.info("Got SIGTERM (docker container stop). Graceful shutdown ", new Date().toISOString());
        shutdown();
    })

    // shut down server
    const shutdown = () => 
    {
        express_server.close(function onServerClosed(err)
        {
            if (err)
            {
                console.error(err);
                process.exitCode = 1;
            }
            process.exit();
        })
    };

};

exports.app = app;