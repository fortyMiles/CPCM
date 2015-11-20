/*
 * Person to Person application server.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-19 Thu
 *
 */


/*
 * Module exports
 *
 */

module.exports = P2P;

var Service = require('./service.js');

/*
 * p2p controller constructor
 *
 */

function P2P(io_server){
	if(io_server){
		P2P.IO_SERVER = io_server;
	}
}

/*
 * IO Server. The Socket IO Server, shared by every P2P server which followed 
 * by this IO Server.
 *
 * @api private
 *
 */

P2P.IO_SERVER = null;

/*
 * the client - socketID dictionary.
 * different P2P share this dictionary.
 *
 * @api private
 *
 */

P2P.online_client_socket = {};

/*
 * Adds a online socket
 *
 * @param {string} username
 * @param {string} socket_id
 * @api public
 *
 */

P2P.prototype.add_online_socket = function(username, socket_id){
	P2P. online_client_socket[username] = socket_id;
};

/*
 * Delete a online socket.
 *
 * @param {string} username
 * @api public
 */

P2P.prototype.delete_online_socket = function(username){
	delete P2P.online_client_socket[username];
};

/*
 * When receiver a new message. First save it inot the db, 
 * and send it to its receiver if is is online.
 *
 * @param {Obeject} message to be sent
 * @param {String} receiver
 * @api public
 */

P2P.prototype.forward_message = function(msg, receiver, event){
	var service = new Service();

	msg = service.decorate_message(msg);
	service.save_a_new_message(msg, receiver, event);

	if(receiver in P2P.online_client_socket){
		P2P._send_reamtime_message(msg, receiver, event);
	}
};

/*
 * Sends realtime messages.
 *
 * @param {Obeject} message to be sent
 * @param {String} receiver
 * @api private
 *
 */

P2P._send_reamtime_message = function(msg, receiver, event){
	if(!( msg && receiver && event)){
		throw Error('missed paramter(s)');
	}

	var target_socket_id = P2P.online_client_socket[receiver];
	P2P.IO_SERVER.to(target_socket_id).emit(event, msg);
};

/*
 * Sets a p2p message to read.
 *
 * @param {String} unique_code of a message
 * @api public
 *
 */

P2P.set_p2p_message_read = function(unique_code){
	var service = new Service();
	service.set_message_to_read(unique_code);
};

/*
 * Sends offline messages to a person.
 *
 * @param {String} receiver
 * @api public
 *
 */

P2P.prototype.send_offline_message = function(receiver,event){
	var service = new Service();
	service.get_offline_person_to_person_message(receiver, function(messages){
		for(var i in messages){
			P2P._send_reamtime_message(messages[i], receiver, event);
		}
	});
};
