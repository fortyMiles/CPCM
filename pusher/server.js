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
		socket.emit('chat message', msg.name + ' you said: ' + msg.content);
		console.log(msg.name + ' send message');
		if(msg.name != 'none'){
			var user_info = {name:msg.name, socket:socket};
			console.log('add a new user');
			clients.push(user_info);
			ioServer.emit('add user', msg.name);
		}

		if(msg.to != 'none'){
			if(msg.to == 'all'){
				//ioServer.emit('chat message', msg.content); // will send to self.
				socket.broadcast.emit('chat message', msg.content);// don's send to self
			}
			var receiver = get_person(msg.to);
			if(receiver!=null){
				receiver.emit('chat message', msg.content);
				socket.emit('chat message', 'send success');
			}
		}

		socket.emit('received', 'reveiced');
		console.info('reveive message from ' + msg.name);
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
	for(var i = 0; i < clients.length; i++){
		if(clients[i].name == user_name){
			socket = clients[i].socket;
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
