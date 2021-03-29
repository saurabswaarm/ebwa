if(process.env.BUILD == "development"){
  console.log('Development Environment');
  require('dotenv').config();
}

// import fs from 'fs';
// import http from 'http';
// import https from 'https';
import path from 'path';
import express from 'express';
let app = express();
import cors from 'cors';
import flash from 'express-flash';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
let MongoStore = mongoStore(session);
import {errorHandler, EbwaError} from './middleware/errorHandler';

// 🔶 Routes 🔶
// 
import authApiRouter from './routes/authapi';
import postsApiRouter from './routes/postApi';

// import {init} from './logger';
// init();




import mongoose from 'mongoose';
import User from './schema/userSchema';
mongoose.connect(process.env.DBURI!, {useNewUrlParser: true, useUnifiedTopology: true});
const mdb = mongoose.connection;
    mdb.on('error', console.error.bind(console, 'connection error:'));
    mdb.once('open', function() {
      console.log('mongodb is connected');
    });


import passportInit from './lib/auth'
passportInit(passport, User);

if(process.env.BUILD == "development"){
  var corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions))
}

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(flash());
app.use(express.urlencoded({extended:false}));
app.use(session({
  name:'session-ebwa',
  secret: process.env.SESSION_SECRET!,
  resave: false,
  rolling:false,
  saveUninitialized: false,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 60000000}
}));
app.use(passport.initialize());
app.use(passport.session());

// api
//
app.use('/api/auth', authApiRouter);
app.use('/api/posts', postsApiRouter)


app.get('/', function (req:express.Request, res:express.Response) {
  res.redirect('/f/');
});

app.get('/f/*', function (req:express.Request, res:express.Response) {
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.use(function(req, res, next) {
  next(new EbwaError('Page Not Found', 404, 404));
});

// error handler
app.use(errorHandler);



// let privateKey = fs.readFileSync(path.join(__dirname,"..", "certs","key.pem"));
// let certificate = fs.readFileSync(path.join(__dirname,"..", "certs","cert.pem"));
// let credentials = {key:privateKey, cert:certificate, passphrase: 'YOUR PASSPHRASE HERE' } as http.ServerOptions;

// let httpServer = http.createServer(app);
// let httpsServer = https.createServer(credentials, app);


// start express server on port 5000
app.listen(process.env.PORTNO, () => {
  console.log("server started on port " + process.env.PORTNO);
}); 

// httpServer.listen(process.env.PORTNO, ()=>{
//   console.log("http server started on port " + process.env.PORTNO);
// })

// httpsServer.listen(process.env.HTTPS_PORTNO, ()=>{
//   console.log("https server started on port " + process.env.HTTPS_PORTNO);
// })

