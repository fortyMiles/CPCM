var handler = require('../message_handler.js');

var last_unique_code = "14527586475031572";
var group_id = "139933000088938028104";
var step = "4";

handler.get_history_message(last_unique_code, group_id, step, function(message_set){
	console.log(message_set.length);
});


