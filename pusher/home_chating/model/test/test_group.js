/*
 * Test cases of group information handler.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

var GroupHandler = require('../group_handler.js');

function test_get_group(){
	var group_handler = new GroupHandler();
	username = '13777414593';
	group_handler.get_scopes(username, function(scopes){
		for(var i in scopes){
			console.log(scopes[i]);
		}
	});
}

if(require.main == module){
	test_get_group();
}
