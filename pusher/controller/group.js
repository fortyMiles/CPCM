/*
 * Manipualte group talking.
 *
 * Author : Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date   : 2015-Nov-16
 *
 */

var request = require('request');
var time_convert = require('./time_convert.js');

var GroupService = require('../service/group_service.js'),
	group_service = new GroupService();

var MessageService = require('../service/message_service.js'),
	message_service = new MessageService();

function Group(){
	
}

/*
 * Gets a persons all joined groups.
 * @param  {String} username
 * @return {array} array of joined groups.
 * @param  {string} lgmc last group message code
 * @api publice
 *
 */

Group.prototype.initiate_group = function(username, socket, lgmc){
	group_service.get_all_joined_groups(username, function(groups){
		for(var i in groups){
			Group.prototype.join_to_group(groups[i], socket);
			Group.prototype.send_a_group_unread(group[i], lgmc, socket);
		}
	});
};

/*
 * Sends one groups unread message to a clients.
 *
 * @param {string} groupname
 * @param {lmgc} last message group code
 * @param {Socket} client's socket
 * @api private
 */

Group.prototype.send_a_group_unread = function(groupname, lgmc, socket){
	group_service.get_offline_messages(groupname, lgmc, function(messages){
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

Group.prototype.join_to_group = function(group, socket){
	socket.join(group);
	console.log('join in ..' + group);
};


/*
 * run in self load
 */
function main(){
	var group = new Group();
	var username = '13777414593';
	group.initiate_group(username, 'socket');
}

if(require.main == module){
	main();
}
