/*
 * Tests Main.js
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-19 Thu
 *
 */

var Account = require('../main.js');


function test_register_client(){
	var username = 'new user';
	var socket_id = 'socket_id';

	var main = new Account({from:username}, socket_id);
	
	main.register_client(username, socket_id);

}


function test_set_user_online(){
	var username = 'new user';
	var socket_id = 'new_socket_id';

	var account = new Account({from:username}, socket_id);
	account.change_to_online();
}

function test_save_into_db(){
	var username = 'mama';
	var socket_id = 'minchiuan socket';

	var account = new Account({from:username}, socket_id);

	account.login(function(){
		console.log('login');
	});
}

function test_set_offline(){
	var username = 'mama';
	var socket_id = 'new socket id';

	var account = new Account({from:username}, socket_id);

	account.change_to_offline();
}

if(require.main == module){
	test_set_offline();
}
