/*
 * The main router of chat server. 
 * routes the different event to different handler.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail,com>
 * Date: 2015-Nov-11
 */
var io = require('socket.io'),
	io_server = io.listen(2333);

var Chat = require('./controller/chat.js'),
	chat = new Chat();

io_server.on('connection', function(socket){
	console.info('New client connecte (id=' + socket.id + ').');

	socket.on('login', function(msg, fn){
		io_server.emit('chat messge', msg.from + ' online');
		fn('reception');
		chat.login(msg, socket);
	});

	socket.on('chat message', function(msg){
		chat.send(msg, socket);
	});

});

