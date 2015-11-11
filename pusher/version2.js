var io = require('socket.io'),
	io_server = io.listen(2333);

var MessageService = require('./service/message_service.js'), 
	message_service = new MessageService();

var clients = {};

io_server.on('connection', function(socket){
	console.info('New client connecte (id=' + socket.id + ').');

	socket.on('login', function(msg){
		msg_handler(msg, socket, _broadcast_login);
	});

	socket.on('chat message', function(msg){
		msg_handler(msg, socket, _send_message);
	});

});

function __register_socket(username, socket){
	if( !clients[username] || !clients[username].connected ){
		clients[username] = socket;
	}
}

function _broadcast_login(msg, socket){
	io_server.emit('chat message', msg.from + ' is online');
}

function _send_message(msg, socket){
	if(msg.to == 'all'){
		io_server.emit('chat message', msg);
	}else{
		if((msg.to in clients) && (clients[msg.to].connected)){
			clients[msg.to].emit('chat message', msg);
		}else{
			socket.emit('chat message', {'warning':'person offline'});
		}
	}
}

function msg_handler(msg, socket, func, throws){
	if(__check_format(msg)){
		__register_socket(msg.from, socket);
		func(msg, socket);
	}else{
		socket.emit('chat message', {'error':'unformatted'});
	}
}

function __check_format(msg){
	/*
	 * check if this message is well formatted.
	 * a message must have keys: event, msg.data.from
	 */
	debugger;
	var keys = ['event', 'from'];
	var formatted = true;

	keys.map(function(item){
		if(!(item in msg)){
			formatted = false;
		}
	});

	return formatted;
}	

