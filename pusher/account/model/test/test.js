/*
 * Tests db operations.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-11-18 Wed
 *
 */

var Handler = require('../handler.js'),
	handler = new Handler();

function test(){

	//handler.register_client('username', 'dwad123');

	handler.user_exist('aausername', function(results){
		for(var k in results[0]){
			console.log(results[0][k]);
		}
	});
}

function test_set_online(){
	handler.set_user_online('username', 'new socket id');
}

function test_set_offline(){
	handler.set_user_offline('new socket id');
}

if(require.main == module){
	test_set_offline();
}
