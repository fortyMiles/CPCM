/*
 * the socket server that handler that socket and msg
 * from the formal router.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-11
 */


/*
 * Module exports
 */

module.exports = Chat;

var MessageService = require('../service/message_service.js'),
	message_service = new MessageService();

var time_convert = require('./time_convert.js');

/*
 * Chat Controller source
 */


/*
 * chat controller constructor
 */
function Chat(){

}

/*
 * save all usernames and client sockets.
 */
Chat.clients = {};

/*
 * Logins a socket in clients list.
 *
 * @param {object} the data send from socket sent, excepted this to be a json.
 * @param {socket.io.socket} clients socket connected to server.
 * @api public
 */

Chat.prototype.login = function(msg, socket){
	this.msg_handler(msg, socket, this.boardcast_login);
};

/*
 * Sends message to a person.
 *
 * @param {object} the data send from socket sent, excepted this to be a json.
 * @param {socket.io.socket} clients socket connected to server.
 * @api public
 */

Chat.prototype.send = function(msg, socket){
	this.msg_handler(msg, socket, Chat.send_message);
};

/*
 * the base function to handle msg and socket.
 *
 * @param {object} the data send from socket sent, excepted this to be a json.
 * @param {socket.io.socket} clients socket connected to server.
 * @param {Function} the process function of this msg.
 * @api protect
 *
 */

Chat.prototype.msg_handler = function(msg, socket, func){
	if(this.check_format(msg)){
		debugger;
		var new_user = this.is_new_client(msg.from);
		var reconnection = this.is_connection(msg.from);

		if(new_user || reconnection){
			this.update_client_socket(msg.from, socket);
			this.send_offline_messages(msg.from);
		}

		if(reconnection){
			//this.send_offline_messages(msg.from);
		}

		func(msg);
	}else{
		socket.emit('chat message', {'error':'unformatted'});
	}
}

/*
 * Checks this msg if is corrent format.
 * a message must have keys: event, msg.data.from
 *
 * @param {object} the data send from socket sent, excepted this to be a json.
 * @param {socket.io.socket} clients socket connected to server.
 * @return {Boolean} if is well formatted
 * @api private
 */

Chat.prototype.check_format = function(msg){
	//debugger;
	var json_constructor = {}.constructor;
	var keys = ['event', 'from'];
	var formatted = true;

	var check_item_exist = function(item){
		if(!(item in msg)){
			fomatted = false;
		}
	}

	if(msg.constructor !== json_constructor){
		formatted = false;
	}else{
		keys.map(check_item_exist);
	}

	return formatted;
}	

/* 
 * Checks this user if is a new user.
 *
 * @param {string} username
 * @return {Boolean} if it's new client, return true, otherwise, return false.
 * @api private
 *
 */
Chat.prototype.is_new_client = function(username){
	var new_client = false;
	if( !Chat.clients[username]){
		new_client = true;
	}
	return new_client;
};

/*
 * Checks this user if is reconnection.
 * 
 * @param {string} username
 * @return {Boolean} if it's reconnection, return true, otherwise, return false.
 * @api private
 */

Chat.prototype.is_connection = function(username){
	var reconnection = false;
	if( (username in Chat.clients) && !Chat.clients[username].connected){
		reconnection = true;
	}
	return reconnection;
};

/*
 * save\update this socket into clients sockets.
 *
 * @param {string} username of client
 * @param {socket.io.socket} clients socket connected to server.
 * @api private
 */

Chat.prototype.update_client_socket = function(username, socket){
	Chat.clients[username] = socket;
}

/*
 * Broadcasts this msg to every socket.
 *
 * @param {json} message
 * @param {socket.io.socket} clients socket connected to server.
 * @api private
 */

Chat.prototype.boardcast_login = function(msg){
	Chat.clients[msg.from].emit('chat message', msg.from + ' is online', function(info){
		console.log(info);
	});
	//socket.broadcast.emit('chat message', msg.from + ' is online');
}

/*
 * send this msg to target clients, if the targe socket is offline, 
 * send a offline information back.
 *
 * @param {json} message
 * @param {socket.io.socket} clients socket connected to server.
 * @api private
 */

/*
 * Sends offline messages to a socket.
 *
 * @param {string} client usernname
 * @api private
 */

Chat.send_message = function(msg, send_offline){

	debugger;

	if(!send_offline){ // if is real time commnication, means, is new messages, need add other information.
		msg.date = new Date(); // append information.
		msg.unique_code = time_convert(new Date(), msg.data.toString().length);
		message_service.save_a_new_message(msg); // save into db
	}

	console.log(msg.unique_code);

	if((msg.to in Chat.clients) && (Chat.clients[msg.to].connected)){
		Chat.clients[msg.to].emit('chat message', msg, function(code){
			console.log('you are righ');
			console.log(code);
			message_service.set_an_unread_message_to_read(code);
			console.log(new Date());
		});
	}else{
		debugger;
		console.log('receiver is offline');
		Chat.clients[msg.from].emit('chat message', {'warning':'person offline'});
	}
};

Chat.prototype.send_offline_messages = function(username){
	var offline_messages = [];
	debugger;

	message_service.get_offline_messages(username, function(messages){
		debugger;
		for(i in messages){
			var send_offline = true;
			Chat.send_message(messages[i], send_offline);
		}
	});
};
