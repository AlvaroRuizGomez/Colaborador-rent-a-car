let app = undefined;

exports.InitServer = async () => {
    require("dotenv").config();
    
    const cors = require("cors");
    const morgan = require("morgan");
    const helmet = require("helmet");
    const express = require("express");
    const eta = require("eta");
    const compression = require("compression");
    const userAgent = require("express-useragent")
    const rateLimit = require("express-rate-limit");
    const router = require("./routes/route");
    const path = require("path");
    const cookieParser = require('cookie-parser');

    const app = express();
    app.use(cookieParser());
    
    const limiterHome = rateLimit({
        windowMs: 1 * 60 * 1000, //1min
        max: 25
    });
    
    const allowlist = [
        `${process.env.URL_FRONTEND}:${process.env.PORT_FRONTEND}`,
        "https://sis.redsys.es/",
        "https://sis.redsys.es/sis/rest/trataPeticionREST",
    ];
    
    // const corsOptions = (req, callback) => {
    //     let corsOptions;
    //     if (allowlist.indexOf(req.header("Origin")) !== -1) {
    //         corsOptions = { origin: true }
    //     } else {
    //         corsOptions = { origin: false }
    //     }
    //     callback(null, corsOptions)
    // };
    
    // politicas de seguridad
    
    // const expressSession =  session({
        //     secret: Math.random().toString(36).substring(7),
        //     saveUninitialized: true,
        //     resave: true
        // });
        
        // configuracion
        // app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }));
        // app.use(expressSession);
        
    app.use((req, res, next) => {
        const cacheTime = 31536000;
        res.set({
            "Cache-Control": `max-age=${cacheTime}`
        });
        next();
    });

    // //headers security
    
    // Content-Security-Policy
    app.use(
        helmet.contentSecurityPolicy(
        {
            
            useDefaults: false,
            directives: {
                reportUri: ["https://gate.rapidsec.net/g/r/csp/616afffa-f826-4461-85c3-941ee6973aff/0/0/3?sct=30c0d50e-2191-4857-9e5d-aed703100472&dpos=report"],
                baseUri: ["'self'"],
                connectSrc: [
                    "'self'",
                    "https://www.googletagmanager.com/gtag/js",
                    "https://www.google-analytics.com/g/collect",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es/sis/realizarPago",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    
                ],
                formAction: [
                    "'self'",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es/sis/realizarPago",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                ],
                fontSrc: ["'self'"],
                manifestSrc: ["'self'"],
                mediaSrc: ["'self'"],
                defaultSrc: ["'none'"],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://badge.rapidsec.com/files/green.svg"
                ],
                objectSrc: ["'none'"],
                styleSrc: [
                    "'self'",
                    "'unsafe-hashes'",
                    "https://sis.redsys.es/sis/NC/sandbox/redsysV2.js",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    "'sha256-QhTxUtlV491XQZHnTX/iZgDCdfTbN1vAILK4yt3jgYI='",
                    "'sha256-7QjiizGaIV/0HdTo3IYJW3cdwZC5lF69KZWWFmTz8Gw='",
                    "'unsafe-inline'"

                ],
                styleSrcAttr: [
                    "'self'",
                    "'unsafe-hashes'",
                    "https://sis.redsys.es/sis/NC/sandbox/redsysV2.js",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    "'sha256-QhTxUtlV491XQZHnTX/iZgDCdfTbN1vAILK4yt3jgYI='",
                    "'sha256-7QjiizGaIV/0HdTo3IYJW3cdwZC5lF69KZWWFmTz8Gw='",
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es",
                    "'unsafe-inline'"

                ],
                workerSrc: ["'self'"],
                scriptSrc: [
                    "'strict-dynamic'",
                    "https://www.google.com/maps/embed",
                    "https://www.googletagmanager.com/gtag/js",
                    "'sha256-sWe1TdbP6hTGY12z2INsiVCNco2shKLDHyvrkMIl53o='",
                    "'sha256-uHg6VHxTrRmQ+sTqpQwel3NmOzbzh75LqbdPzRWY1Cg='",
                    "'sha256-A8LG6vgfKNxiBOdiThfNp8hIlr/VJ4k++5UswtqcFWg='",
                    "'sha256-8wxcr0tQeDrTYzn/Og8N0rc46wg6qYlfKAU5ptiqpSc='",
                    "'sha256-pf7ATGsfXb/44dlQjex9+9P448/6hIclLgrz7V2AkAc='",
                    "'sha256-4Ow+Ur8L9cYCVoD2ccQS8Ksz6mcrBVS+n/iRKfzhrD4='",
                    "'sha256-Oke7EEwk0COk1ampSlXcyK8UoO0ukpUnXzyDeUMXNkA='",
                    "https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent",
                    "https://sis.redsys.es/sis/NC/sandbox/redsysV2.js",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    "https://sis.redsys.es",
                    "'sha256-S+X8s301GQoAcOI+8hj231fxePS+QG94YC0px7AraoQ='",
                    "'sha256-Z6AFHJcDDPHLaWVdLcifmBDDzjDMApb7nM2qbkPTJeo='",
                    "'sha256-YVCjXA9IbEbK3w4jDiqhWcfCPs+7VhG2TuPyX8v/NB8='",
                    "'sha256-V7W7QXt7q8HLNfscNP1nsRRepxg+sOz7CfsY1z6EzfY='",
                    "'sha256-iGoNEAX01mPhFHPIHqILK51hg3IxPfVSI9LFcd/8Vpg='",
                    "'sha256-PZEg+mIdptYTwWmLcBTsa99GIDZujyt7VHBZ9Lb2Jys='",
                    "'sha256-c7UrMTK2hnfEDAZh1ENjqCJcH/9cqaKMEMPjIE9RUFM='",
                    "'sha256-5YNcDGqyZeDxGr9YmU6qLTlPX3Cgq14oFpH7CX5CXgM='",
                    "'sha256-tSulbyIC9pCfjTMSJ+oGN0txgCAxkNMdf3mNyhvqLd8='",
                    "'sha256-4tehLJfCUwWh7TmeCizR3A07iyPojrk1EWuuoIsveSU='",
                    "'sha256-WrMdOLuaD9CxHHdi0shvJ+D32HQ0N9SzTjTDLIbeC08='",
                    "'sha256-5+02zu5UULQkO7w1GIr6vftCgMfFdZcAHeDtFnKZsBs='",
                    "'unsafe-inline'",
                ],
                scriptSrcElem: [
                    "'self'", 
                    //google analtics
                    "https://www.googletagmanager.com/gtag/js",
                    "'sha256-sWe1TdbP6hTGY12z2INsiVCNco2shKLDHyvrkMIl53o='",
                    "'sha256-uHg6VHxTrRmQ+sTqpQwel3NmOzbzh75LqbdPzRWY1Cg='",
                    "'sha256-A8LG6vgfKNxiBOdiThfNp8hIlr/VJ4k++5UswtqcFWg='",
                    "'sha256-8wxcr0tQeDrTYzn/Og8N0rc46wg6qYlfKAU5ptiqpSc='",
                    "'sha256-pf7ATGsfXb/44dlQjex9+9P448/6hIclLgrz7V2AkAc='",
                    "'sha256-4Ow+Ur8L9cYCVoD2ccQS8Ksz6mcrBVS+n/iRKfzhrD4='",
                    "'sha256-Oke7EEwk0COk1ampSlXcyK8UoO0ukpUnXzyDeUMXNkA='",
                    "https://maps.googleapis.com/maps/api/js/QuotaService.RecordEvent",
                    //redsis
                    "https://sis.redsys.es",
                    "https://sis.redsys.es",
                    "https://www.google.com/maps/embed",
                    "https://sis.redsys.es/sis/NC/sandbox/redsysV2.js",
                    "https://sis.redsys.es/sis/NC/redsysV2.js",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    //scripts inline propios
                    "'sha256-S+X8s301GQoAcOI+8hj231fxePS+QG94YC0px7AraoQ='",
                    "'sha256-Z6AFHJcDDPHLaWVdLcifmBDDzjDMApb7nM2qbkPTJeo='",
                    "'sha256-YVCjXA9IbEbK3w4jDiqhWcfCPs+7VhG2TuPyX8v/NB8='",
                    "'sha256-V7W7QXt7q8HLNfscNP1nsRRepxg+sOz7CfsY1z6EzfY='",
                    "'sha256-iGoNEAX01mPhFHPIHqILK51hg3IxPfVSI9LFcd/8Vpg='",
                    "'sha256-PZEg+mIdptYTwWmLcBTsa99GIDZujyt7VHBZ9Lb2Jys='",
                    "'sha256-c7UrMTK2hnfEDAZh1ENjqCJcH/9cqaKMEMPjIE9RUFM='",
                    "'sha256-5YNcDGqyZeDxGr9YmU6qLTlPX3Cgq14oFpH7CX5CXgM='",
                    "'sha256-tSulbyIC9pCfjTMSJ+oGN0txgCAxkNMdf3mNyhvqLd8='",
                    "'sha256-4tehLJfCUwWh7TmeCizR3A07iyPojrk1EWuuoIsveSU='",
                    "'sha256-WrMdOLuaD9CxHHdi0shvJ+D32HQ0N9SzTjTDLIbeC08='",
                    "'sha256-5+02zu5UULQkO7w1GIr6vftCgMfFdZcAHeDtFnKZsBs='",
                    //js
                    "'sha256-zSry2p/DPzG0rkc5IQn/HFwlMgNVmiqKHZtrNQuFLEc='"
                ],
                childSrc: [
                    "'self'",
                    "https://apis.google.com",
                    "https://maps.googleapis.com",
                    "https://www.google.com", 
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                ],
                frameSrc: [
                    "'self'",
                    "https://apis.google.com", 
                    "https://maps.googleapis.com", 
                    "https://www.google.com", 
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    "'sha256-4tehLJfCUwWh7TmeCizR3A07iyPojrk1EWuuoIsveSU='",
                    "'sha256-WrMdOLuaD9CxHHdi0shvJ+D32HQ0N9SzTjTDLIbeC08='",
                ],
                
                frameAncestors: [
                    // "'self'",
                    "https://apis.google.com",
                    "https://maps.googleapis.com",
                    "https://www.google.com",
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/",
                    "https://sis.redsys.es/sis/rest/trataPeticionREST",
                    "https://www.rentcarmallorca.es/detalles",
                    "https://rentcarmallorca.es/detalles"
                ],
                upgradeInsecureRequests: [],
                blockAllMixedContent: [],
                prefetchSrc: ["'self'"],
            },
        })
    );


    // ------------------------
    
    // // X-Frame-Options
    // app.use(helmet.frameguard({
    //     action: "deny",
    // }));

    // Cross-Origin-Embedder-Policy: require-corp
    // app.use(helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }));

    // Cross-Origin-Opener-Policy: same-origin
    // app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" }));

    // Cross-Origin-Resource-Policy: same-origin
    // app.use(helmet.crossOriginResourcePolicy(
    //         { policy: "cross-origin" }
    // ));


    //------------

    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());

    app.use(
        helmet.permittedCrossDomainPolicies({
            permittedPolicies: "by-content-type",
        })
    );

    app.use(helmet.referrerPolicy({
        policy: "no-referrer",
    }));
    
    app.use(compression());
    app.use(userAgent.express());
    
    app.use(express.urlencoded({ extended: true, limit: "2mb" }));
    app.use(express.json({ limit: "2mb" }));
    // app.use( cors(corsOptions) );
    app.use(cors({
        credentials: true,
        origin: allowlist
    }));
    
    
    app.use(morgan("combined"));
    
    //FUNcioa - registro de html como eta
    // app.engine(".html", eta.renderFile);
    // app.set("views", path.join(__dirname, "../public"));
    // app.set("view engine", "html");

    // app.use("/", express.static("public"));
    // app.use("/car/", express.static("public"));

    // https://www.npmjs.com/package/safe-regex

    app.engine(".html", eta.renderFile);
    app.set("views", path.join(__dirname, "../public"));
    app.set("view engine", "html");

    app.use("/", express.static(path.join(__dirname, "../public")));
    app.use("/car/", express.static(path.join(__dirname, "../public")));
    
    
    // rutas
    app.use("/", limiterHome);
    app.use("/", router);
    
    // escucha puerto servidor
    let express_server = app.listen(process.env.PORT_FRONTEND, (error) => {
        if (error) {
            console.error(`[process ${process.pid}] Error ${error} ${process.env.PORT_FRONTEND}`);
        }
        console.info(`[process ${process.pid}] Listening at port ${process.env.PORT_FRONTEND}`);
    }
    );

    process.on("SIGINT", function onSigint() {
        console.info("Got SIGINT (aka ctrl-c). Graceful shutdown ", new Date().toISOString());
        shutdown();
    });
    
    process.on("SIGTERM", function onSigterm() {
        console.info("Got SIGTERM (stop). Graceful shutdown ", new Date().toISOString());
        shutdown();
    })

    // shut down server
    const shutdown = async () =>
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
    }

};

exports.app = app;

