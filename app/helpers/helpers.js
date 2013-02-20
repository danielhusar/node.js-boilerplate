/*
 * Variosu helpers
 * 
 *
*/
var settings = require(process.cwd()  + '/config/settings');

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
	res.render(template, variables);
};