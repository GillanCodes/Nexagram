/**
 * Author : @Gillancodes
 * Name : Nexagram
 * Created : 23/05/23
 */

import * as express from "express";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import { Callback } from "mongoose";
import cors = require('cors');
import sanitizedConfig from "./config/config";

/** init app */
let app:express.Application = express();
let server = require('http').createServer(app);
// incldes database connect file
require('./config/database');

//Cofig bodyParse
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(bodyParser.json({limit: "50mb"}));
//Config cookie parser
app.use(cookieParser());

//Cors init
    //Set withlist
let whitelist = [undefined, "http://localhost:5053"];
    //set Options
const corsOptions:Object = {
    origin : function(origin:string, cb:Callback)
    {
        if (whitelist.indexOf(origin) !== -1)
        {
            cb(null, true);
        }
        else
        {
            cb(new Error('not allowed by cors !'), true);
        }
    },
    "credentials" : true,
    "allowHeaders" : ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders' : ['sessionId'],
    'methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 200
}
//init cors
app.use(cors(corsOptions));

//Import middlewares
import {checkUser, requireAuth} from "./middlewares/auth.middleware";
//Use middlewares
app.use(checkUser);
app.get('/api/jwtid', requireAuth, (req:express.Request, res:express.Response) => {
    res.status(201).send(res.locals.user.id);
});

app.use("/cdn", express.static(sanitizedConfig.CDN_PATH));

//Import routes
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import postsRoutes from "./src/routes/posts.routes";
//Routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', requireAuth, userRoutes);
app.use("/api/post", requireAuth, postsRoutes);

//Socket.IO
require('./src/socket/socket').socket(server);

server.listen(sanitizedConfig.PORT, () => {
    console.log(`[Nexagram] API is UP ! Listening on ${sanitizedConfig.PORT}`);
});