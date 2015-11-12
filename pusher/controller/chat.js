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

var Q = require('q');
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
	this.msg_handler(msg, socket, this.send_message);
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
		this.update_client_socket(msg.from, socket);
		func(msg, socket);
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
 * save\update this socket into clients sockets.
 *
 * @param {string} username of client
 * @param {socket.io.socket} clients socket connected to server.
 * @api private
 */

Chat.prototype.update_client_socket = function(username, socket){
	debugger;
	if( !Chat.clients[username] || !Chat.clients[username].connected ){
		Chat.clients[username] = socket;
	}
}

/*
 * Broadcasts this msg to every socket.
 *
 * @param {json} message
 * @param {socket.io.socket} clients socket connected to server.
 * @api private
 */

Chat.prototype.boardcast_login = function(msg, socket){
	socket.emit('chat message', msg.from + ' is online', function(info){
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

Chat.prototype.send_message = function(msg){
	if(msg.to == 'all'){
		io_server.emit('chat message', msg);
	}else{
		debugger;
		if((msg.to in Chat.clients) && (Chat.clients[msg.to].connected)){
			msg.unique_code = time_convert(new Date(), msg.data.toString().length);
			message_service.save_a_new_message(msg);
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
	}
}

/*
 * Sends offline messages to a socket.
 *
 * @param {string} client usernname
 * @param {socekt} client socket
 */

Chat.prototype.send_offline_message = function(username, socket){
	var offline_messages = [];

	Q.fcall(function(){
		offline_messages = message_service.get_offline_messages(username);
	})
};
