// server.js
// import the http module
var express = require('express'),
	expressLayouts = require('express-ejs-layouts'),
	bodyParser = require('body-parser'),
	app = express(),
	routes = require('./app/router'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	port = 8080;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere'}));

routes.apply(app);

//set static files
app.use(express.static(__dirname + '/public'));


app.locals.formatKm = function (value) {
	return (parseFloat(value).toFixed(2));
};
app.locals.formatDuration = function (value) {
	return (value.split('.')[0]);
};

app.locals.formatDurationFromSec = function (value) {
	var min = parseInt(value/60, 10),
		sec = parseInt(value%60, 10);

	return min + ':' + sec;
};

app.locals.convertPace = function (value) {
	var min = parseInt(value, 10),
		sec = Math.round(parseFloat((value - min) * 60, 10));
	return min + '\'' + sec + '\"';
};

app.locals.convertFromMs = function (ms) {
	var hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
	    minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
	    seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
    return hours + ":" + minutes + ":" + seconds;
};

// start server and listen on port x
app.listen(port, function() {
  console.log('Listening on port 8080');
});
