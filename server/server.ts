if(process.env.BUILD == "development"){
  console.log('Development Environment Variables Set');
  require('dotenv').config();
}

let path = require("path");
import express from 'express';
let app = express();

// 🔶 Routes 🔶
// 
const authApiRouter = require('./routes/authapi');

let passport = require('passport');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session); // refer https://www.npmjs.com/package/connect-mongo
let bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect(process.env.DBURI, {useNewUrlParser: true, useUnifiedTopology: true});
const mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function() {
  console.log('mongodb is connected');
});

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
  name:'session-id-saurab',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store:new MongoStore({mongooseConnection:mongoose.connection})
}));




app.get('/', function (req:express.Request, res:express.Response) {
  console.log('Frontend route fired');
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.get('/f/*', function (req:express.Request, res:express.Response) {
  console.log('Frontend route fired');
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.use('/api/auth', authApiRouter);


// start express server on port 5000
app.listen(process.env.PORTNO, () => {
  console.log("server started on port " + process.env.PORTNO);
}); 

module.exports = {mongoose}