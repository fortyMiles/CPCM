var io = require('socket.io'),
	ioServer = io.listen(3000),
	sequence = 1,
	clients = [];

var CONNECTION = 'connection',
	DISCONNECT = 'disconnect',
	CHAT_MESSAGE = 'chat message',
	ADD_USER = 'add user',
	INFORMATION_RECEIVED = 'information received',
	ERROR = 'error';

ioServer.on(CONNECTION, function(socket) {
	console.info('New client connected (id=' + socket.id + ').');
	socket.on(CHAT_MESSAGE, function(msg){
		console.info(msg);
		msg = JSON.parse(msg);
		console.info(msg['sender']);
		console.info(msg['receiver']);
		console.info(msg['message']);
		sender = msg['sender'].trim();
		receiver = msg['receiver'].trim();
		content = msg['message'];

		socket.emit(CHAT_MESSAGE, "send success");
		console.log('send message to sender');
		console.log(sender + ' send message' + 'and he said ' + content);

		if(sender != 'none'){
			var user_info = {name:sender, socket:socket, socket_id: socket.id};
			console.log('***********add a new user');
			clients.push(user_info);

			addUserMessage = {'newUser':sender};
			ioServer.emit(ADD_USER, addUserMessage);
		}

		if(receiver != 'none'){
			console.log('receiver is not null');
			if(receiver == 'all'){
				//ioServer.emit('chat message', msg.content); // will send to self.
				socket.broadcast.emit('chat message', msg);// don's send to self
			}else{
				var receiver = get_person(receiver);
				if(receiver){
					console.log('find a receiver in list');
					receiver.emit('chat message',msg);
					socket.emit('chat message', {'message':'send success'});
				}
			}

			socket.emit('information been received', {'message':'reveiced'});
			console.info('reveive message from ' + sender);
		}
	});

	socket.on(DISCONNECT, function() {
		var user_index = get_user_by_socket(socket);
		clients.splice(user_index, 1);
		console.info('Client gone (id=' + socket.id + ').');
	});

});

function get_person(user_name){
	var socket = null;
	console.info("point 1" + user_name);
	for(var i = clients.length - 1; i >= 0; i--){
		console.log('clinet name is ' + clients[i].name);
		console.info('clinet. ' + i + ' name == ' + clients[i].name + '  receiver name is ' + user_name);
		if(clients[i].name == user_name){
			socket = clients[i].socket;
			console.info("find a reveiver: " + socket.id);
			break;
		}
	}
	return socket;
}


function get_user_by_socket(socket){
	// based on the socket, and give the index of use in clients list.
	var user_index = null;
	for(var i = 0; i < clients.length; i++){
		if(clients[i].socket_id = socket.id){
			user_index = i;
			console.log('find the user in list');
			break;
		}
	}
	return user_index;
}
