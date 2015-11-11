var io = require('socket.io'),
    io_server = io.listen(2333);

var MessageService = require('./service/message_service.js'),
	message_service = new MessageService();

var clients = {};

io_server.on('connection', function(socket){
    console.info('New client connecte (id=' + socket.id + ').');

	socket.on('login', function(msg){
		if(check_fomat(msg)){
			if(!clients[msg.data.from]){
				clients[msg.data.from] = socket;
			}
			io_server.emit('chat message', msg.data.from + ' on line now');
		}
	});

	socket.on('chat message', function(msg){
		if(check_fomat(msg)){
			//if(!clients[msg.data.from])||(!clients[msg.data.from].connected)
			if(msg.data.to == 'all'){
				io_server.emit('chat message', msg);
			}else{
				if((msg.data.to in clients) && (clients[msg.data.to].connected)){
					clients[msg.data.to].emit('chat message', msg);
				}else{
					message_service.save_a_new_message(msg);
				}
			}
		}
	});
});

function see_dic(dict){
	for(var e in dict){
		console.log(e);
	}
}

function check_fomat(msg){
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
