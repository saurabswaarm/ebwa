"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.BUILD == "development") {
    console.log('Development Environment Variables Set');
    require('dotenv').config();
}
var path = require("path");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
// 🔶 Routes 🔶
// 
var authApiRouter = require('./routes/authapi');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); // refer https://www.npmjs.com/package/connect-mongo
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true });
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function () {
    console.log('mongodb is connected');
});
app.use(express_1.default.static(path.join(__dirname, "..", "build")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(session({
    name: 'session-id-saurab',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.get('/', function (req, res) {
    console.log('Frontend route fired');
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});
app.get('/f/*', function (req, res) {
    console.log('Frontend route fired');
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});
app.use('/api/auth', authApiRouter);
// start express server on port 5000
app.listen(process.env.PORTNO, function () {
    console.log("server started on port " + process.env.PORTNO);
});
module.exports = { mongoose: mongoose };
