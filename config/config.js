module.exports = function(app, express){
	
	var cons    	 = require('consolidate'),
  	  swig    	 = require('swig'),
			helpers 	 = require('../app/helpers/helpers'),
			path 			 = require('path'),
			settings 	 = require('./settings'),
			config     = {};
			

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
	});

	//include dirnames for config urls
	config.swig.root = process.cwd() + config.swig.root;
	config.less.src = process.cwd() + config.less.src;

	//settings
	app.set('port', process.env.PORT || 3000);
	app.engine('.html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', process.cwd() + '/app/views');
	swig.init(config.swig);
	app.use(express.favicon(process.cwd() + '/public/img/icons/favicon.ico')); 
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser(settings.cookie.secret));
	app.use(express.session());
	app.use(app.router);
	app.use(require('less-middleware')(config.less));
	app.use(express.static(path.join(process.cwd(), 'public')));


};