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

module.exports = P2G;

var GroupService = require('./service/group_service.js');

/*
 * p2g controller constructor
 *
 */

function P2G(IO_SERVER, CLIENT_SOCKET){
	if(IO_SERVER){
		P2G.IO_SERVER = IO_SERVER;
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

P2G.prototype.CLIENT_SOCKET = null;

/*
 * IO Server. The Socket IO Server, shared by every P2G server which followed 
 * by this IO Server.
 *
 * @api private
 *
 */

P2G.IO_SERVER = null;

/*
 * When receiver a new message. First saves it into the db, 
 * and broadcasts it to group memebers.
 *
 * @param {Obeject} message to be sent
 * @param {String} receiver
 * @api public
 */

P2G.prototype.forward_message = function(msg, group, event){
	//var service = new Service();

	//msg = service.decorate_message(msg);
	//service.save_a_new_message(msg, group, event);

	P2G.IO_SERVER.to(group).emit(event, msg);
};

/*
 * Gets a persons all joined groups.
 * @param  {String} username
 * @return {array} array of joined groups.
 * @param  {string} lgmc last group message code
 * @api publice
 *
 */

P2G.prototype.initiate_group = function(username, lgmc){
	var group_service = new GroupService();
	var self = this;
	group_service.get_all_joined_groups(username, this.recovery_group.bind(self));
};

/*
 * Recovery groups.
 *
 * @param {Array} groups a person joined.
 * @api private
 *
 */

P2G.prototype.recovery_group = function(groups){
	for(var i in groups){
		this.join_to_group(groups[i]);
		//		P2G.send_group_offline_message(groups[i], lgmc, socket);
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

P2G.send_group_offline_message = function(groupname, lgmc, socket){
	var service = new Server();
	service.get_group_offline_messages(groupname, lgmc, function(messages){
		for(var i in messages){
			socket.emit(messages[i].event, messages[i]);
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

P2G.prototype.join_to_group = function(group){
	this.CLIENT_SOCKET.join(group);
	this.CLIENT_SOCKET.emit('p2g', {join: ' into' + group});
};
