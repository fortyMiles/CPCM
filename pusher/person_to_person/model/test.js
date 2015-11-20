/*
 * Test case of handler.js
 *
 * @author Minchiuan Gao <minchiua.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fir
 *
 */

var Handler = require('./handler.js');

function test_save_new_message(){
	var handler = new Handler();
	var send = '18857453090';
	var receiver = '12345678920';
	var message = '{message:{}}';
	var event = 'test_event';
	var unique_code = '213hf213';

	handler.save_a_new_message(send, receiver, message, event, unique_code);
}

if(require.main == module){
	test_save_new_message();
}
