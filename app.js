
/****
 * Main app logic
 */

//requires
var express  = require('express'),
  	http     = require('http'),
		helpers  = require('./app/helpers/helpers'),
		app = express(),
		config = require('./config/config')(app, express);


//require all controllers with the models
require("fs").readdirSync("./app/controllers").forEach(function(file) {
	require('./app/controllers/' + file)(app, require('./app/models/' + file)(app, helpers), helpers);
});


//require static routes
require('./config/routes')(app, helpers);


//start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port: ' + port);
