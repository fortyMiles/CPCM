var CHAT = 'chat message';
console.log('import send_message.js success');
var socket = io('http://localhost:3000');
socket.emit('chat message', 'begin');
$('form').submit(function(){
	var message = $('#message').val();

	console.log('message == ' + message);
	socket.emit(CHAT, message);
	$('#message').val('');
	return false;
});

socket.on(CHAT, function(msg){
	msg = JSON.parse(msg);
	$('#messages').append($('<li>').text(msg.message));
});
socket.on('add user', function(msg){
	$('#users').append($('<li>').text('exised user : ' + msg));
});

