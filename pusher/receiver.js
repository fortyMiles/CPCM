/*
 * Receiver, a server that listen the clients's messages, 
 * and save it very quickly to a database.
 * 
 * Author: Minchiuan.Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 * 
 */



var io = require('socket.io'),
    io_server = io.listen(3000);

var events = new require('./configration/events.js');
var e = new events();

var UserService = require('./service/user_service.js'),
    user_service = new UserService();

var MessageService = require('./service/message_service.js'),
    message_service = new MessageService();

io_server.on(e.CONNECTION, function(socket) {
    console.info('New client connected (id=' + socket.id + ').');

    socket.on(e.CHAT_MESSAGE, function(msg){
        var type = msg.type.trim();
        console.log(type);

        if(type == e. LOGIN){
            var sender = msg.data.from.trim();
            user_service.login_one_user(msg.data.from.trim(), socket.id, socket);
            console.log('point 1');
            socket.emit(e. CHAT_MESSAGE, "{you are:"+ sender+" }");
            message_service.get_user_unread_message(sender, function(results){
                var messages = message_service.parse_message(results);
                console.log(messages);
                for(var i = 0; i < messages.length; i++){
                    socket.emit(e.CHAT_MESSAGE, messages[i]);
                }
            });
        }

        if(type == e.CHAT){
            message_service.save_a_new_message(msg);
        }

    });

    socket.on(e.FEED, function(msg){});

    socket.on(e.DISCONNECT, function(){
        console.info('Client gone (id=' + socket.id + ').');
        user_service.disconnect(socket);
    });

    console.log('I am checking unread messages');
    //message_service.get_unread_message(); // this sectence will execute all the time ~, it's interestring :)

    // check if login, then, send this message.

});

