
/***
 * Module dependencies.
 */

//requires
var express  = require('express'),
  	routes   = require('./routes'),
  	http     = require('http'),
		cons     = require('consolidate'),
  	swig     = require('swig'),
		helpers  = require('./libraries/helpers'),
  	path     = require('path'),
		settings = require('./settings');

//app init
var app = express(),
    config = {};

//development enviroment
app.configure('development', function(){
	//errors handling
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.logger('dev'));
	//swig settings
	config.swig = settings.swig.development;
	//less settings
	config.less = settings.less.development;


});

//production enviroment
app.configure('production', function(){
	//errors handling
	app.use(express.errorHandler());
	app.use(express.logger());
	//swig settings
	config.swig = settings.swig.production;
	//less settings
	config.less = settings.less.production;
	//pack all js files
	helpers.packJs();
});

//include dirnames for config urls
config.swig.root = __dirname + config.swig.root;
config.less.src = __dirname + config.less.src;

//settings
app.set('port', process.env.PORT || 3000);
app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.init(config.swig);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(settings.cookie.secret));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')(config.less));
app.use(express.static(path.join(__dirname, 'public')));


//rountes
app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
