/*
 * The main router of chat server. 
 * routes the different event to different handler.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail,com>
 * Date: 2015-Nov-11
 */

var Router = require('./router/router.js');

var Event = require('./event.js'),
	EVENT = new Event();

var Cleanup = require('./cleanup.js');

var Echo = require('./echo/main.js');
var CreateNewRelation = require('./creat_new_relation/main.js');
var new_relation = require('./new_relation/main.js');

var io = require('socket.io');
var cleanup_up = new Cleanup(new Router().clean_up);

/*
 * Initial Socket Server by a port.
 * 
 * @param {Integrte} port
 */

function SocketServer(port){
	this.port = port;
}

/*
 * Run the process.
 *
 * @api public
 *
 */

SocketServer.prototype.run = function(){
	IO_SERVER = io.listen(this.port);

	console.log('server begining.. listening on ' + this.port);

	IO_SERVER.on(EVENT.CONNECTION, function(SOCKET){
		console.info('New client connecte (id=' + SOCKET.id + ').');

		SOCKET.on(EVENT.LOGIN, function(msg){
			new Router().route(msg, SOCKET, EVENT.LOGIN, IO_SERVER);
		});

		SOCKET.on(EVENT.P2P, function(msg){
			new Router().route(msg, SOCKET, EVENT.P2P, IO_SERVER);
		});

		SOCKET.on(EVENT.P2G, function(msg){
			var router = new Router();
			router.route(msg, SOCKET, EVENT.P2G, IO_SERVER);
		});

		SOCKET.on(EVENT.FEED, function(msg){
			var router = new Router();
			router.route(msg, SOCKET, EVENT.FEED, IO_SERVER);
		});


		SOCKET.on(EVENT.INVITATION, function(msg){
			new Router().route(msg, SOCKET, EVENT.INVITATION, IO_SERVER);
		});

		SOCKET.on(EVENT.AGREE, function(msg){
			new Router().route(msg, SOCKET, EVENT.AGREE, IO_SERVER);
			new CreateNewRelation().accept(msg);
		});

		SOCKET.on(EVENT.P2P_ECHO, function(msg){
			new Echo().person_to_person_echo(msg);
		});

		SOCKET.on(EVENT.DISCONNECT, function(){
			new Router().disconnect(SOCKET.id);
		});

		SOCKET.on(EVENT.NEW_RELATION, function(msg){
			new_relation.notify(msg);
		});
	});
};


if(require.main == module){

	var socket_server = new SocketServer(2333);
	socket_server.run();
}
