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

    this.save_a_new_message = function(msg){
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
        var sender = msg.from.trim();
        var receiver = msg.to.trim();
		var event = msg.event;
		var unique_code = msg.unique_code;

        db_handler.insert(sender, receiver, message, event, unique_code);
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

     var parse_message = function(results, callback){
        console.log(results);
        var messages = [];
        if(results.length === 0){
            console.log('no message');
        }

        for(var i in results){
				var m = {};
                console.log('result is not null');
                m.data = JSON.parse(results[i].message);
                m.from = results[i].sender;
                m.to = results[i].receiver;
                m.date = results[i].create_date;
                m.unique_code = results[i].unique_code;
				m.event = results[i].event;
                console.log(m);
                messages.push(m);
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

	/*
	 * Gets one person's all offline messages.
	 *
	 * @param {string} username
	 * @return {list} messages list
	 *
	 */
	this.get_offline_messages = function(username, callback){
		db_handler.get_offline_messages(username, function(results){
			debugger;
			var messages = parse_message(results);
			//console.log(messages);
			callback(messages);
		});
	};


    this.set_an_unread_message_to_read = function(date, username){
        console.log('set ' + username + ' time ' + date + 'to read');
        db_handler.set_message_to_read(date, username);
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

    //message_service.save_a_new_message(message, 'chat');

    var name = '18857453090';
    //message_service.get_unread_message(name);
	
	message_service.get_offline_messages('right', function(messages){
		for(i in messages){
			console.log(messages[i].from);
		}
	});
}

if(require.main == module){
	main();
}
