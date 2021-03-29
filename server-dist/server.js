"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.BUILD == "development") {
    console.log('Development Environment');
    require('dotenv').config();
}
// import fs from 'fs';
// import http from 'http';
// import https from 'https';
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var cors_1 = __importDefault(require("cors"));
var express_flash_1 = __importDefault(require("express-flash"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var MongoStore = connect_mongo_1.default(express_session_1.default);
var errorHandler_1 = require("./middleware/errorHandler");
// 🔶 Routes 🔶
// 
var authapi_1 = __importDefault(require("./routes/authapi"));
var postApi_1 = __importDefault(require("./routes/postApi"));
// import {init} from './logger';
// init();
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema_1 = __importDefault(require("./schema/userSchema"));
mongoose_1.default.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true });
var mdb = mongoose_1.default.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function () {
    console.log('mongodb is connected');
});
var auth_1 = __importDefault(require("./lib/auth"));
auth_1.default(passport_1.default, userSchema_1.default);
if (process.env.BUILD == "development") {
    var corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors_1.default(corsOptions));
}
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "build")));
app.use(express_1.default.json());
app.use(cookie_parser_1.default(process.env.SESSION_SECRET));
app.use(express_flash_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    name: 'session-ebwa',
    secret: process.env.SESSION_SECRET,
    resave: false,
    rolling: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 60000000 }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// api
//
app.use('/api/auth', authapi_1.default);
app.use('/api/posts', postApi_1.default);
app.get('/', function (req, res) {
    res.redirect('/f/');
});
app.get('/f/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", 'build', 'index.html'));
});
app.use(function (req, res, next) {
    next(new errorHandler_1.EbwaError('Page Not Found', 404, 404));
});
// error handler
app.use(errorHandler_1.errorHandler);
// let privateKey = fs.readFileSync(path.join(__dirname,"..", "certs","key.pem"));
// let certificate = fs.readFileSync(path.join(__dirname,"..", "certs","cert.pem"));
// let credentials = {key:privateKey, cert:certificate, passphrase: 'YOUR PASSPHRASE HERE' } as http.ServerOptions;
// let httpServer = http.createServer(app);
// let httpsServer = https.createServer(credentials, app);
// start express server on port 5000
app.listen(process.env.PORTNO, function () {
    console.log("server started on port " + process.env.PORTNO);
});
// httpServer.listen(process.env.PORTNO, ()=>{
//   console.log("http server started on port " + process.env.PORTNO);
// })
// httpsServer.listen(process.env.HTTPS_PORTNO, ()=>{
//   console.log("https server started on port " + process.env.HTTPS_PORTNO);
// })
