/*
 * Router test.
 * 
 * @author Minchiuan Gao<minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18-Wed
 *
 */

var Router = require('../router.js'),
	router = new Router();

var Socket = require('../../test/socket.js'),
	socket = new Socket();

function test(){

	
}

function test_login(){
	var msg = {
		data  : {message : '你在的吗'},
		from  : 'right',
		to    : 'left',
		lgmc  : 'chat message',
		event : 'chag message'
	};

	var test_str = "string";
	router.route(msg, socket, 'login', null);
}

function test_off_line(){
	router.disconnect('0.51808936085086316');
}

if(require.main == module){
	console.log('test... begin');
	test_off_line();
	console.log('test... end');
}
