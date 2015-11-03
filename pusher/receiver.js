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

var User = require('./utility/user_handler.js');
var events = new require('./configration/status.js');
var e = new events();

var Service = require('./service/service.js'),
    service = new Service();

io_server.on(e.CONNECTION, function(socket) {
    console.info('New client connected (id=' + socket.id + ').');
    socket.on(e.CHAT_MESSAGE, function(msg){
        msg = JSON.parse(msg);
        var sender = msg.data.from.trim();
        var receiver = msg.data.to.trim();
        var type = msg.type.trim();

        if(type == e. LOGIN){
            user = new User(sender, socket, socket.id);
            user.login();
            socket.emit(e. CHAT_MESSAGE, "{you are:"+ sender+" }");
            // and process unread messages.
        }else{
            service.save_a_new_message(msg);
        }
    });

    console.log('I am checking unread messages');
    service.get_a_unread_message(); // this sectence will execute all the time ~, it's interestring :)

    // check if login, then, send this message.

    socket.on(e.DISCONNECT, function(){
        delete_a_user(socket);
        console.info('Client gone (id=' + socket.id + ').');
    });
});

var emit_message(msg){
    receiver = msg.data.to.trim();

};
var delete_a_user = function(socket){
    User.disconnect(socket);
};





