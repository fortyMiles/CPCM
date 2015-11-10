var io = require('socket.io'),
    io_server = io.listen(2333);

var clients = {};

io_server.on('connection', function(socket){
    console.info('New client connecte (id=' + socket.id + ').');

	socket.on('login', function(msg){
		if(!clients[msg.data.from]){
			clients[msg.data.from] = socket;
		}
		see_dic(clients);
		io_server.emit('chat message', msg.data.from + ' on line now');
	});

	socket.on('chat message', function(msg){
		if(msg.data.to == 'all'){
			io_server.emit('chat message', msg);
		}else{
			see_dic(clients);
			clients[msg.data.to].emit('chat message', msg);
		}
	});
});

function see_dic(dict){
	for(var e in dict){
		console.log(e);
	}
}
