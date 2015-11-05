/*
 * A checker that checks if there is any unread message in db.
 * if have, emit this message and send to server.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-5
 *
 */

module.exports = Checker;

function Checker(){
    
    var host = 'http://localhost:3000';
    var socket = require('socket.io-client')(host);
    var Events = require('../configration/events.js'),
        e = new Events();

    var MessageService = require('../service/message_service.js'),
        message_service = new MessageService();

    var number = 1; // each time the unread messages number of check get from db.


    var messages = []; // in memory, could set in redis later.

    var emit_checker_ready = function(){
        socket.emit('checker ready');
    };

    var emit_an_unread_message_to_server = function(){
        if(messages.length === 0){ // if there is on message on memory, get some new message from db.
            message_service.get_unread_messages(number, function(results){
                messages = message_service.parse_message(results);
            });
        }

        if(messages.length === 0){
            console.log('no unread message');
            emit_checker_ready();
        }else{
            msg = messages.pop();
            socket.emit(e. NEW_MESSAGE, msg);
        }
    };

    socket.on('connect', function(){
        emit_checker_ready();
    });

    socket.on('check', function(){
        emit_an_unread_message_to_server();
    });

    /*
    setInterval(function(){
        emit_an_unread_message_to_server();
        console.log('test');
    }, 100);
   */
}

var checker = new Checker();


