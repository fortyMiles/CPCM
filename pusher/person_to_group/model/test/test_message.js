/*
 * Test cases of messages handler.
 * 
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

var Handler = require('../message_handler.js');

function test_save_group_message(){
	var handler = new Handler();
	handler.save_group_message('group sender', '{}{}{}}{}', '123124123', 'TEST GROUP');
}

function test_get_unread_group_message(){
	var handler = new Handler();
	handler.get_group_offline_message('77414593144741054108','14480135841881524', function(results){
		for(var i in results){
			console.log(results[i]);
		}
	});
}

if(require.main == module){
	console.log('*************TEST BEGIN**************');
	test_get_unread_group_message();
	console.log('*************TEST END**************');
}
