/*
 * Receiver, a server that listen the clients's messages, 
 * and save it very quickly to a database.
 * 
 * Author: Minchiuan.Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 * 
 */



var io = require('socket.io'),
    io_server = io.listen(2333);

var events = new require('./configration/events.js'),
    e = new events();

var UserService = require('./service/user_service.js'),
    user_service = new UserService();

var MessageService = require('./service/message_service.js'),
    message_service = new MessageService();

var SocketService = require('./service/socket_service.js'),
    socket_service = new SocketService();

var Cleanup = require('./cleanup.js'),
    clean_up = new Cleanup(user_service.break_down);


var WaitMessage = require('./service/wait_message.js'),
    wait_message = new WaitMessage();

io_server.on(e.CONNECTION, function(socket) {
    console.info('New client connecte (id=' + socket.id + ').');

    
    socket.on(e.CHAT_MESSAGE, function(msg){
        var type = msg.type.trim();
        debugger;
        console.log(type);

        if(type == e. LOGIN){
            var username = msg.data.from.trim();

            user_service.login_one_user(username, socket.id, socket, function(){
                socket_service.registe_socket(username, socket, function(){
                    socket_service.send_syn(socket, username);
                });
            });
        }

        if(type == e.CHAT){
            message_service.save_a_new_message(msg);
        }

    });

    socket.on(e.FEED, function(msg){
    });

    /** check new message **/
    socket.on('checker ready', function(){
        socket.emit('check');
    });

    socket.on(e.NEW_MESSAGE, function(msg){
        socket_service.send_a_message(msg, e. CHAT_MESSAGE, function(id){
            message_service.set_an_unread_message_to_read(id, function(){
                socket.emit('check');
            });
        });

        console.log('have new message');
    });
    /** check new message end **/

    socket.on(e.DISCONNECT, function(){
        user_service.disconnect(socket);
    });

    //socket_service.send_unread_messages();
    //console.log('i get unread messages');
    // this sectence will execute all the time ~, it's interestring :)
});


function add_message_to_queue(msg, callback){
    unread_set.add(msg);
    callback();
}
