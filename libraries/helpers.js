/*
 * Variosu helpers
 * 
 *
*/
var packer = require('../node_modules/node.packer'),
		settings = require('../settings');

/**

*/

/*
 * Generate template
 * @param(res) res
 * @param(template)
 *
 */
exports.template = function(res, template, variables){
	variables.enviroment = (process.env.NODE_ENV == 'production') ? process.env.NODE_ENV : 'development';
	variables.resources = settings['js-files'];
	console.dir(variables);
	res.render(template, variables);
};

//pack all the js files
exports.packJs = function(){
	//pack the files	
	var appFiles = [],
			pluginFiles = [],
			allFiles = settings['js-files'];
			
	for (var i in allFiles.app) {
			appFiles.push(__dirname + '/../public/' + allFiles.app[i]);
	}
	for (var i in allFiles.plugins) {
			pluginFiles.push(__dirname + '/../public/' + allFiles.plugins[i]);
	}
	packer({
		input : appFiles,
		output : __dirname + '/../public/js/app.packed.js'
	});
	packer({
		input : pluginFiles,
		output : __dirname + '/../public/js/plugins.packed.js'
	});
}