/*
 * Tests Service
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Wed
 *
 */

function test_service(){
	var Service = require('../service.js'),
		service = new Service();

	var username = 'new user';
	var socket_id = 'socket_id';
	//service.register_user(username, socket_id);
	
	service.is_new_user(username, function(existed){
		console.log(existed);
	});
}

function test_main(){

	var username = 'new user';
	var socket_id = 'socket_id';

	var Account = require('../main.js'),
		main = new Account({from:username}, socket_id);
	
	//main.is_new_client('new no user');
	

	main.register_client(username, socket_id);

}

if(require.main == module){
	test_main();
}
