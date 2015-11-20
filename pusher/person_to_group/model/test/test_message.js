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

if(require.main == module){
	console.log('*************TEST BEGIN**************');
	test_save_group_message();
	console.log('*************TEST END**************');
}
