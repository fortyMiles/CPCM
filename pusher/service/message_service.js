/*
 * Recives other module's request and CRUD information to database.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 *
 */

module.exports = MessageService;
function MessageService(){
    var DataHandler = require('../dao/data_handler.js'),
        db_handler = new DataHandler();

	var SocketService = require('./socket_service.js'),
		socket_service = new SocketService();

	var Q = require('q');

    this.save_a_new_message = function(msg, event){
        /*
         * save this data to message database;
         * 
         * ---
         *  paremeter:
         *
         *  name: data
         *  type: json
         *  
         */
        var message = JSON.stringify(msg.data);
        var sender = msg.data.from.trim();
        var receiver = msg.data.to.trim();

        db_handler.insert(sender, receiver, message, event);
    };

	this.send_an_unread_message = function(msg){
		var message_id = msg.id;
		var event = msg.event;
		var receiver = msg.to;
		delete msg.id;
		delete msg.event;
		var socket = null;
		Q.fcall(function(){
			debugger;
			socket = socket_service.get_socket_by_name(receiver);
			console.log(socket);
		})
		.then(function(){
            debugger;
			socket.emit(event, msg);
		})
		.then(function(){
			set_an_unread_message_to_read(message_id);
		}).done();
	};

    this.parse_message = function(results){
        console.log(results);
        var messages = [];
        var message = {};
        if(results.length === 0){
            console.log('no message');
        }

        for(var i in results){
                console.log('result is not null');
                message.data = JSON.parse(results[i].message);
                message.from = results[i].sender;
                message.to = results[i].receiver;
                message.date = results[i].create_date;
                message.id = results[i].id;
				message.event = results[i].event;
                console.log(message);
                messages.push(message);
        }

        console.log('point 1');
        return messages;
    };


    this.get_unread_messages = function(number, callback){
        /*
         * retrive from message data, get a unread message.
         * 
         */
        db_handler.get_earliest(number, callback);
    };


    var set_an_unread_message_to_read = function(record_id){
        console.log('set ' + record_id + 'to read');
        db_handler.set_message_to_read(record_id);
    };

}


function main(){
    var message_service = new MessageService();

    var data = {
        message: '你在的吗',
        from: '高民权',
        to: '王小丫',
    };

    var message = {
        type: 'invitation',
        data: data,
    };

    message_service.save_a_new_message(message, 'chat');

    var name = '18857453090';
    //message_service.get_unread_message(name);
}

if(require.main == module){
    main();
}
