const path = require("path");
const express = require("express");
const app = express();
const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(favicon(path.join(__dirname, "..", "build", "favicon.ico")));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

// start express server on port 5000
app.listen(3004, () => {
  console.log("server started on port 3000");
});