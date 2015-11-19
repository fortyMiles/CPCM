/*
 * Tests Service.js
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Wed
 *
 */

var Service = require('../service.js'),
	service = new Service();


function test_service(){
	var username = 'new user';
	var socket_id = 'socket_id';
	//service.register_user(username, socket_id);
	
	service.is_new_user(username, function(existed){
		console.log(existed);
	});
}

function test_set_online(){
	service.set_user_online('new user', 'socket001');
}

function test_exist(){
	service.check_exist('new user 1', function(exist){
		console.log(exist);
	});
}

function test_offline(){
	service.set_user_offline('minchiuan socket');
}

function test_set_all_online_breakline(){
	service.set_all_online_offline();
}

if(require.main == module){
	test_set_all_online_breakline();
}
