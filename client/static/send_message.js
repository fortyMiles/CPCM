var CHAT = 'chat message';
console.log('import send_message.js success');
try{
    var socket = io('http://localhost:2333');
    $('form').submit(function(){
        var message = $('#m').val();

        console.log('message == ' + message);
        try{
            var json_data = JSON.parse(message);
        }catch(e){
            console.error(e);
        }

        socket.emit(json_data.event, json_data, function(data){
			console.log(data);
		});
        $('#m').val('');
        return false;
    });
}catch(err){
    socket.emit(CHAT, null);
}

socket.on(CHAT, function(msg, callback){
    var message = JSON.stringify(msg);
	callback();
    $('#messages').append($('<li>').text(message));
});
socket.on('add user', function(msg){
    $('#users').append($('<li>').text('exised user : ' + msg));
});

