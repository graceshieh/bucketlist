var express = require('express');
var app = express();
var path = require('path');

var bp = require('body-parser');
app.use(bp.json());

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));


require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, function() {
    console.log("MEAN Black Belt on port 8000");
})