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
	//socket.join(group);
	console.log('join in ..' + group);
};


/*
 * Send one user's missed group messages.
 *
 * @param {string} group name
 * @param {string} lgmc last group message code
 * @param {socket} client's socket
 *
 */

Group.prototype.send_offline_messages = function(group, socket, lgmc, callback){

};

var main = function(){
	var group = new Group();
	var username = '13777414593';
	group.initiate_group(username, 'socket');
};

if(require.main == module){
	main();
}
