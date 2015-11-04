var CHAT = 'chat message';
console.log('import send_message.js success');
var socket = io('http://localhost:3000');
$('form').submit(function(){
	var message = $('#message').val();

	console.log('message == ' + message);
        var json_data = JSON.parse(message);
	socket.emit(CHAT, json_data);
	$('#message').val('');
	return false;
});

socket.on(CHAT, function(msg){
	$('#messages').append($('<li>').text(msg));
});
socket.on('add user', function(msg){
	$('#users').append($('<li>').text('exised user : ' + msg));
});

