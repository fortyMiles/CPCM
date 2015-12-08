/*
 * Person to Server application server.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-20 Fri
 *
 */


/*
 * Module exports
 *
 */

module.exports = HomeChat;

var GroupService = require('./service/group_service.js');
var MessageService = require('./service/message_service.js');

/*
 * p2g controller constructor
 *
 */

function HomeChat(IO_SERVER, CLIENT_SOCKET){
	if(IO_SERVER){
		HomeChat.IO_SERVER = IO_SERVER;
	}

	if(CLIENT_SOCKET){
		this.CLIENT_SOCKET = CLIENT_SOCKET;
	}
}

/*
 * Current Client Socket.
 *
 * @api private
 *
 */

HomeChat.prototype.CLIENT_SOCKET = null;

/*
 * IO Server. The Socket IO Server, shared by every HomeChat server which followed 
 * by this IO Server.
 *
 * @api private
 *
 */

HomeChat.IO_SERVER = null;

/*
 * When receiver a new message. First saves it into the db, 
 * and broadcasts it to group memebers.
 *
 * @param {Obeject} message to be sent
 * @param {String} receiver
 * @api public
 */

HomeChat.prototype.forward_message = function(msg, group, event){
	var service = new MessageService();

	//msg = service.decorate_message(msg);
	//service.save_a_new_message(msg, group, event);

	HomeChat.IO_SERVER.to(group).emit(event, msg);
};

/*
 * Lets a person join all his feed group.
 * @param  {String} username
 * @param  {string} lgmc last group message code
 * @param  {socket} client socket that will receive the message.
 * @api publice
 *
 */

HomeChat.prototype.initiate_scope = function(username, lgmc, socket){
	var group_service = new GroupService();
	var self = this;
	this.lgmc = lgmc;
	group_service.get_all_joined_scopes(username, this.recovery_group.bind(self));
};

/*
 * Recovery groups.
 *
 * @param {Array} groups a person joined.
 * @api private
 *
 */

HomeChat.prototype.recovery_group = function(groups){
	for(var i in groups){
		this.join_to_group(groups[i]);
	//	HomeChat.send_group_offline_message(groups[i], this.lgmc, this.CLIENT_SOCKET);
	}
};

/*
 * Sends one groups unread message to a clients.
 *
 * @param {string} groupname
 * @param {lmgc} last message group code
 * @param {Socket} client's socket
 * @api private
 */

HomeChat.send_group_offline_message = function(groupname, lgmc, socket){
	var service = new MessageService();
	service.get_group_offline_message(groupname, lgmc, function(messages){
		for(var i in messages){
			socket.emit('p2g', messages[i]);
		}
	});
};

/*
 * Joins one socket to a group.
 * @param {string} username
 * @param {socket} client socket
 * @api private
 *
 */

HomeChat.prototype.join_to_group = function(group){
	this.CLIENT_SOCKET.join(group);
	console.log('join into ....');
};
