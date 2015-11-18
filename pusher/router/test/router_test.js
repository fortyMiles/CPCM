/*
 * Router test.
 * 
 * @author Minchiuan Gao<minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18-Wed
 *
 */

function test(){
	var Router = require('../router.js'),
		router = new Router();
	
	var Socket = require('../../test/socket.js'),
		socket = new Socket();

	
	var msg = {
		data  : {message : '你在的吗'},
		from  : 'right',
		to    : 'left',
        lgmc  : 'chat message',
		event : 'chag message'
	};

	var test_str = "string";
	router.route(test_str, socket, 'p2p');

}


if(require.main == module){
	console.log('test... begin');
	test();
	console.log('test... end');
}
