/*
 * GET home page.
 */
var helpers = require('../libraries/helpers');

exports.index = function(req, res){
	helpers.template(res, 'index.html', {});
};

