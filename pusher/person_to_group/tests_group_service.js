var handler = require('./group_handler.js');

handler.get_all_groups('18668420316', function(group_list){
	group_list.map(function(g){
		console.log(g);
	});
});

