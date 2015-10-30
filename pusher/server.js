var io = require('socket.io'),
    ioServer = io.listen(3000);

var controller_handler = require('./utility/controller_handler.js');
var User = require('./utility/user_handler.js');
var events = new require('./configration/status.js');
var e = new events();

console.log(e.CONNECTION);

ioServer.on(e.CONNECTION, function(socket) {
    console.info('New client connected (id=' + socket.id + ').');

    socket.on(e.CHAT_MESSAGE, function(msg){
        msg = JSON.parse(msg);
        console.log(msg);
        var type = msg.type.trim();
        var sender = msg.data.from.trim();
        var receiver = msg.data.to.trim();

        switch(type){
            case 'login':
                user = new User();
                user.set_information(sender, socket, socket.id);
                user.login();
                socket.emit(e. CHAT_MESSAGE, "{you_are:" + sender + "}");

                if(user.has_unread_message()){
                    var unread_messages = user.get_unread_messages();
                    socket.emit(e. CHAT_MESSAGE, "{you have: unread messages}");
                    for(var i = 0; i < unread_messages.length; i++){
                        socket.emit(e. CHAT_MESSAGE, unread_messages[i]);
                    }
                }

                /*
                 * check for unread message
                 */

                break;

            case 'chat':
                msg.data.date = get_date();
                send_message(sender, receiver, msg);
                break;

            case 'invitation':
                if(!User.is_registerred(receiver)){
                    // send phone message to receiver
                }
                msg.data.date = get_date();
                send_message(sender, receiver, msg);
                
                break;

            case 'accept':

                var relation = msg.data.relation;
                var relation = msg.data.relation;
                var nickname = msg.data.nickname;
                User.ensure_relation(sender, receier, relation, nickname);

                send_message(sender, receiver, msg);

                break;
        }
    });
    
    var get_date = function(){
        var date = new Date();
        return date;
    };

    var send_message = function(sender, receiver, msg){
        console.info(msg);
        message = msg.data.message;

        // test code
        console.log('send message to sender');
        console.log(sender + ' send message' + 'and he said ' + message);

        if(sender && receiver){
            msg = JSON.stringify(msg);
            console.log(User.is_login(receiver));
            console.log(User.is_login(sender));
            if(receiver == 'all'){
                socket.broadcast.emit(CHAT_MESSAGE, msg);// don's send to self
            }else{
                if(User.is_login(receiver)){
                    console.log('receiver is login');
                    var receiver_socket = User.get_socket_by_name(receiver);
                    receiver_socket.emit(e.CHAT_MESSAGE, msg);
                    socket.emit(e. CHAT_MESSAGE, "you said: " + msg);
                }else{
                    socket.emit(e. CHAT_MESSAGE, "receiver is not login: " + msg);
                    User.add_one_unread_message(receiver, msg);
                }
            }
        }
    };


    socket.on(e.DISCONNECT, function() {
        User.disconnect(socket);
        console.info('Client gone (id=' + socket.id + ').');
    });

});
