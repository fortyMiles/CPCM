/*
 * Test cases of group information handler.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

var GroupHandler = require('../group_handler.js');

function test_get_home(){
	var group_handler = new GroupHandler();
	username = '17862710056';
	GroupHandler.get_homes(username, function(results){
		console.log(results);
	});
}


function test_get_relation_id(){
	var group_handler = new GroupHandler();
	var username = '17862710056';
	GroupHandler.get_relation_id(username, function(group){
		console.log(group);
	});
}

function test_get_friend_id(){
	var username = '17862710056';
	GroupHandler.get_friend_id(username, function(group){
		console.log(group);
	});
}

if(require.main == module){
	test_get_home();
	test_get_relation_id();
	test_get_friend_id();
}
