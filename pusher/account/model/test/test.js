/*
 * Tests db operations.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-11-18 Wed
 *
 */

function test(){
	var Handler = require('../handler.js'),
		handler = new Handler();

	//handler.register_client('username', 'dwad123');

	handler.user_exist('aausername', function(results){
		for(var k in results[0]){
			console.log(results[0][k]);
		}
	});
}

if(require.main == module){
	test();
}
