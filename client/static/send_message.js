var P2P = 'p2p';
console.log('import send_message.js success');
try{
    var socket = io('http://localhost:2333');
    $('form').submit(function(){
        var message = $('#m').val();

        console.log('message == ' + message);
		var json_data = null;

        try{
            json_data = JSON.parse(message);
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
    socket.emit(P2P, null);
}

socket.on('you are reconnection', function(msg){
		
});

socket.on(P2P, function(msg){
	if(msg.unique_code){
		console.log(msg.unique_code);
		console.log('emit p2p echo');
		socket.emit('p2p echo', {unique_code: msg.unique_code});
	}
    var message = JSON.stringify(msg);
    $('#messages').append($('<li>').text(message));
});

socket.on('add user', function(msg){
    $('#users').append($('<li>').text('exised user : ' + msg));
});

socket.on('p2g', function(msg){
    var message = JSON.stringify(msg);
    $('#group').append($('<li>').text(message));
	console.log('last code:' + msg.unique_code);
});

socket.on('reception', function(){
	console.log('reception...');
    $('#reception').append($('<li>').text('message reception'));
});

socket.on('err', function(msg){
    $('#error').append($('<li>').text(JSON.stringify(msg)));
});
