var io = require('socket.io'),
    ioServer = io.listen(3000);

var controller_handler = require('./utility/controller_handler.js');
var user_handler = require('./utility/user_handler.js');
var events = new require('./configration/status.js');
var e = new events();

console.log(e.CONNECTION);
var user = new user_handler();
user.test();

ioServer.on(e.CONNECTION, function(socket) {
    console.info('New client connected (id=' + socket.id + ').');

    socket.on(e.CHAT_MESSAGE, function(msg){
        msg = JSON.parse(msg);
        var type = msg.type.trim();
        var sender = msg.from.trim();
        var receiver = msg.to.trim();

        switch(type){
            case 'login':
                user.add_a_login_user(username=user_name, socket=socket, user_socket_id=socket.id);


            case 'chat':
                console.info(msg);
                message = msg.message;

                socket.emit(e.SENT_TO_SERVER,'');

                // test code
                console.log('send message to sender');
                console.log(sender + ' send message' + 'and he said ' + msg);

                if(sender && receiver){
                    if(receiver == 'all'){
                        socket.broadcast.emit(CHAT_MESSAGE, msg);// don's send to self
                    }else{
                        if(user.is_login(receiver)){
                            var receiver_socket = user.get_socket_by_user(receiver);
                            receiver_socket.emit(CHAT_MESSAGE, msg);

                            socket.emit(e.SENT_TO_RECEIVER, '');// send to client, his message it sent to receiver successfully.
                        }else{
                            var unread_message = {sender:null, message:null, date:null};
                            unread_message.receiver = sender;
                            unread_message.message = message;
                            unread_message.date = new Date();

                            user.add_to_unread_list(receiver, unread_message);
                        }
                    }
                }
                break;
        }
    });


    socket.on(e.DISCONNECT, function() {
        var user_index = get_user_by_socket(socket);
        clients.splice(user_index, 1);
        console.info('Client gone (id=' + socket.id + ').');
    });

});

function get_person(user_name){
    var socket = null;
    console.info("point 1" + user_name);
    for(var i = clients.length - 1; i >= 0; i--){
        console.log('clinet name is ' + clients[i].name);
        console.info('clinet. ' + i + ' name == ' + clients[i].name + '  receiver name is ' + user_name);
        if(clients[i].name == user_name){
            socket = clients[i].socket;
            console.info("find a reveiver: " + socket.id);
            break;
        }
    }
    return socket;
}


function get_user_by_socket(socket){
    // based on the socket, and give the index of use in clients list.
    var user_index = null;
    for(var i = 0; i < clients.length; i++){
        if(clients[i].socket_id = socket.id){
            user_index = i;
            console.log('find the user in list');
            break;
        }
    }
    return user_index;
}
