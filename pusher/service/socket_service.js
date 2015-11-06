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

    var WaitMessage = require('./wait_message.js'),
        wait_message = new WaitMessage();


    var SocketHandler = require('../dao/socket_handler.js'),
        socket_handler = new SocketHandler();


    var Events = new require('../configration/events.js'),
        e = new Events();

    var send_list = {};
        
    
    this.send_a_message = function(msg, event, callback){
        var id = msg.id;

        //if(!(id in send_list)){
            var socket = socket_handler.get_socket_by_name(msg.to);
            console.log(socket);
            delete msg.id;
            if(socket){
                socket.emit(event, msg);
                send_list[id] = id;
                callback(id);
            }
        //}
    };


    this.registe_socket = function(username, socket, callback){
        socket_handler.add_a_socket(username, socket);
        callback();
    };

    this.get_socket_by_name = function(name){
        return socket_handler.get_socket_by_name(name);
    };


    this.send_syn = function(socket, username){
        socket.emit(e. CHAT_MESSAGE, {hello:username});
    };

}
