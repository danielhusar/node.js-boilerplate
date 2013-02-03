/*
 * GET home page.
 */
var helpers = require(process.cwd() + '/app/helpers/helpers');

exports.index = function(req, res){
	helpers.template(res, 'index.html', {});
};

