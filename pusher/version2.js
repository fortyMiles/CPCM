/*
 * The main router of chat server. 
 * routes the different event to different handler.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail,com>
 * Date: 2015-Nov-11
 */
var io        = require('socket.io'),
	io_server = io.listen(2333);

var Chat = require('./controller/chat.js'),
	chat = new Chat();
	
var Group = require('./controller/group.js'),
	group = new Group();

var MessageService = require('./service/message_service.js'),
	message_service = new MessageService();

io_server.on('connection', function(socket){
	console.info('New client connecte (id=' + socket.id + ').');

	socket.on('login', function(msg, fn){
		io_server.emit('chat messge', msg.from + ' online');
		fn('reception');
		chat.router(io_server, socket.id, msg, 'login');
		group.join_to_groups(msg.from, socket, function(socket){
			socket.emit('chat message', {join:' group finished'});
		});
	});

	socket.on('chat message', function(msg){
		chat.router(io_server, socket.id, msg, 'chat');
	});


	socket.on('message ensure', function(code){
		message_service.set_an_unread_message_to_read(code.toString());
	});

});

