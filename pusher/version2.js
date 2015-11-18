/*
 * The main router of chat server. 
 * routes the different event to different handler.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail,com>
 * Date: 2015-Nov-11
 */
var io = require('socket.io'),
	io_server = io.listen(2333);

var Router = require('./router.js'),
	router = new Router();

var Event = require('./event.js'),
	event = new Event();

io_server.on('connection', function(socket){
	console.info('New client connecte (id=' + socket.id + ').');

	socket.on(event.LOGIN, function(msg, fn){
		router.
		io_server.emit('chat messge', msg.from + ' online');
		fn('reception');
		chat.router(io_server, socket.id, msg);
	});

	socket.on(event.P2P, function(msg){
		chat.router(io_server, socket.id, msg);
	});

	socket.on(event.P2G, function(msg){
		chat.router(io_server, socket.id, msg);
	});

	socket.on(event.ENSURE, function(code){
		message_service.set_an_unread_message_to_read(code.toString());
	});

});

