/*
 * Functional test for group talking.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-16
 *
 */

var io = require('socket.io'),
	io_server = io.listen(2333);


io_server.on('connection', function(socket){

	console.info('New client connecte (id=' + socket.id + ').');

	socket.on('group', function(msg){
		socket.join('group');
		io_server.sockets.connected[socket.id].emit('chat message', 'join successed');
	});

	socket.on('gc', function(msg){
		io_server.to('group').emit('chat message', msg);
	});
});
