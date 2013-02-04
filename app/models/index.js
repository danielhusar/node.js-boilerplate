module.exports = function(app, helpers){

	var model = {
		data : ['first', 'second', 'third'],
		edit : function(id, data){},
		new  : function(data){},
		delete : function(id){}
	}

	return model;
};