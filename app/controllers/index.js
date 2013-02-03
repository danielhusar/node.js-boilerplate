/*
 * GET home page.
 */

exports['/'] = function(req, res){
	helpers.template(res, 'index.html', {});
};

