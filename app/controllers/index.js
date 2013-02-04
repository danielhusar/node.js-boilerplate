/**

	EXAMPLE OF ONE CONTROLLER, EVERY CONTROLLER MUST HAVE MODEL WITH SAME NAME INSIDE MODEL DIRECTORY

**/
module.exports = function(app, model, helpers){

	console.log(model);

	app.get('/test', function(req, res){
		helpers.template(res, 'index.html', {});
	});

};