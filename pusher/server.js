var
    io = require('socket.io'),
    ioServer = io.listen(3000),
    sequence = 1;
    clients = [];
	//message_info = {'username':null, 'socket_id':null},
	test_information = {sender:'Tom', message:'Test Connection'};

function get_name(msg){
	// get name from msg
	var name = msg.slice(5);
	return name;
}
// Event fired every time a new client connects:
ioServer.on('connection', function(socket) {
    console.info('New client connected (id=' + socket.id + ').');
	//
	//clients.push(socket);
    // When socket disconnects, remove it from the list:
	socket.on('chat message', function(msg){
		console.info(msg);
		msg = JSON.parse(msg);
		console.info(msg['sender']);
		console.info(msg['receiver']);
		console.info(msg['message']);
		sender = msg['sender'].trim();
		receiver = msg['receiver'].trim();
		content = msg['message'];
		

		socket.emit('chat message', {'message':'send success'});
		console.log(sender + ' send message' + 'and he said ' + content);
		if(sender != 'none'){
			var user_info = {name:sender, socket:socket};
			// append each user to list. 
			// This need to be a 'set', means, every user just save once.
			console.log('***********add a new user');
			clients.push(user_info);

			addUserMessage = {'newUser':sender};
			ioServer.emit('add user', addUserMessage);
		}

		if(receiver != 'none'){
			console.log('receiver is not null');
			if(receiver == 'all'){
				//ioServer.emit('chat message', msg.content); // will send to self.
				socket.broadcast.emit('chat message', msg);// don's send to self
			}
			var receiver = get_person(receiver);
			
			if(receiver!=null){
				console.log('find a receiver in list');
				var send_message = {'message':content, 'mark':'new message'};
				receiver.emit('chat message',send_message);
				socket.emit('chat message', {'message':'send success'});
			}
		}

		socket.emit('information been received', {'message':'reveiced'});
		console.info('reveive message from ' + sender);
	});

    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }
    });
});

function get_person(user_name){
	var socket = null;
	console.info("point 1" + user_name);
	for(var i = clients.length - 1; i >= 0; i--){
		console.log('clinet name is ' + clients[i].name);
		console.info('clinet.i name == ' + clients[i].name + ' ' + ' receiver name is ' + user_name);
		if(clients[i].name == user_name){
			socket = clients[i].socket;
			console.info("find a reveiver: " + socket.id);
			break;
		}
	}
	return socket;
}

// Every 1 second, sends a message to a random client:
/*
setInterval(function() {
    var randomClient;
    if (clients.length > 0) {
        randomClient = Math.floor(Math.random() * clients.length);
		var length = clients.length;
        clients[randomClient].socket.emit('chat message', 'there is ' + length + 'users now');
    }

}, 1000);
*/
