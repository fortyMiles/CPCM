/*
 * Change server to oop, test its correctness
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Oct-23
 */


function MainServer(port){
	this.io = require('socket.io');
	this.io_server = io.listen(port);
	this.events = new require('./configration/status.js');
	this.e = new events();

	this.run = function(){
		console.info('server start');
		io_server(e.CONNECTION, socket_handler);
	};

	this.socket_handler(socket){
	};
}
