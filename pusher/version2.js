/*
 * The main router of chat server. 
 * routes the different event to different handler.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail,com>
 * Date: 2015-Nov-11
 */

var Router = require('./router/router.js'),
	router = new Router();

var Event = require('./event.js'),
	event = new Event();

/*
 * Initial Socket Server by a port.
 * 
 * @param {Integrte} port
 */

function SocketServer(port){
	var io = require('socket.io');
	this.io_server = io.listen(port);
	this.port = port;
}

/*
 * Run the process.
 *
 * @api public
 *
 */

SocketServer.prototype.run = function(){
	console.log('server begining.. listening on ' + this.port);
	this.io_server.on(event.CONNECTION, function(socket){
		console.info('New client connecte (id=' + socket.id + ').');

		socket.on(event.LOGIN, function(msg){
			router.route(msg, socket, event.LOGIN, io_server);
		});

		socket.on(event.P2P, function(msg){
			router.route(msg, socket, event.P2P, io_server);
		});

		socket.on(event.P2G, function(msg){
			router.route(msg, socket, event.P2G, io_server);
		});

		socket.on(event.ENSURE, function(code){
			router.route(msg, socket, event.ENSURE, io_server);
		});
	});
};


if(require.main == module){
	var socket_server = new SocketServer(2333);
	socket_server.run();
}
