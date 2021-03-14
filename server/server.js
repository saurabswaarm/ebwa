require('dotenv').config()

let path = require("path");
let express = require("express");
let app = express();

// 🔶 Routes 🔶
// 
const authApiRouter = require('./routes/authapi');

let passport = require('passport');
let session = require('express-session');
let MongoStore = require('connect-mongo'); // refer https://www.npmjs.com/package/connect-mongo
let bcrypt = require('bcrypt');
let cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.DBURI, {useNewUrlParser: true, useUnifiedTopology: true});



const mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function() {
  console.log('mongodb is connected');
});



app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(express.urlencoded({extended:false}))




app.use('/api/auth', authApiRouter)


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});


// start express server on port 5000
app.listen(process.env.PORTNO, () => {
  console.log("server started on port " + process.env.PORTNO);
}); 