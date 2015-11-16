/*
 * Manipualte group talking.
 *
 * Author : Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date   : 2015-Nov-16
 *
 */

var request = require('request');

function Group(){
	
}

/*
 * The URL that gets a person's all group
 */

Group.get_groups_http = 'http://127.0.0.1:8000/group/member/';

/*
 * Gets a persons all joined groups.
 * @param {String} username
 * @return {array} array of joined groups.
 * @api private
 *
 */
Group.prototype.get_groups = function(username, callback){
	
	var url = Group.get_groups_http + username;
	
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var groups_list = JSON.parse(body).data;
			var groups = [];
			for(var i in groups_list){
				groups.push(groups_list[i].group.trim());
			}
			callback(groups);
		}

		if(error){
			throw error;
		}
	});

};

/*
 * Joins one socket to groups.
 * @param {string} username
 * @param {socket} client socket
 * @api public
 *
 */

Group.prototype.join_to_groups = function(username, socket, callback){
	this.get_groups(username, function(){
		for(var i in groups){
			socket.join(groups[i]);
			console.log('join in ..' + groups[i]);
		}
	});
	callback(socket);
};

var main = function(){
	var group = new Group();
	var username = '13777414593';
	group.get_groups(username, function(groups){
		for(var i in groups){
			console.log('test');
		}
	});
};

if(require.main == module){
	main();
}
