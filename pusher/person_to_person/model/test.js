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

function test_set_to_read(){
	// if no message?
	// if message already is Read?

	var handler = new Handler();
	var unique_code = 'a14479902866911584';
	handler.set_message_to_read(unique_code);
}

if(require.main == module){
	test_set_to_read();
}
