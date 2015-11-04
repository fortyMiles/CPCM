/*
 * Operation with sockets.
 * 
 * emit events, register socket in socket list.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-4
 */

module.exports = SocketService;

function SocketService(){

    var MessageService = require('./message_service.js'),
        message_service = new MessageService();

    var SocketHandler = require('../dao/socket_handler.js'),
        socket_handler = new SocketHandler();


    var Events = new require('../configration/events.js'),
        e = new Events();

    var emit_message = function(event, message, callback){
        /*
         * emits one message by a given socket.
         * 
         * ---
         * parameters:
         *
         * -name: socket
         *  description: which socket to emit message
         *
         * -name: event
         *  description: which event to be emit
         *
         * -name: message
         *  description: the message
         *
         * -name: callback
         *  description: the functino that when emit message finish to do.
         */
        send_to_username(message.to, function(socket){
            socket.emit(event, message);
        });

        callback(message.id);
    };

    var send_to_username = function(username, callback){
        var socket = socket_handler.get_socket_by_name(username);
        if(socket){
            callback(socket);
        }
    };

    this.registe_socket = function(username, socket, callback){
        socket_handler.add_a_socket(username, socket);
        callback();
    };


    this.send_syn = function(socket, username){
        socket.emit(e. CHAT_MESSAGE, {hello:username});
    };

    this.send_unread_messages = function(){
        /*
         * checks all the message, given with message's receiver is login and send it out.
         *
         */
        message_service.get_unread_messages(function(results){
            var messages = message_service.parse_message(results);
            console.log(messages);
            for(var i = 0; i < messages.length; i++){
                debugger;
                emit_message(e.CHAT_MESSAGE, messages[i], message_service.set_a_unread_message_to_read);
            }
        });
    };
}
