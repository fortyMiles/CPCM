/*
 * db handler for group information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17-Tue
 *
 */


module.exports = GroupHandler;

var request = require('request');

function GroupHandler(){
	/*
	 * Selects one peson's all joined groups.
	 *
	 * @param {string} username
	 * @callback {Function} operation of return results.
	 * @api public
	 *
	 */

}

GroupHandler.get_joined_home = function(username, callback){

	var joined_list = [];
	GroupHandler.get_homes(username, function(home_list){
		for(var i in home_list){
			var home_id = home_list[i].trim();
			callback(home_id);
		}
	});

	GroupHandler.get_relation_id(username, function(result){
		callback(result);
	});

	GroupHandler.get_friend_id(username, function(result){
		callback(result);
	});


};

GroupHandler.get_homes = function(username, callback){
	var group_list = [];
	var url = 'http://121.40.158.110:8000/relation/home_id/';

	url += username;

	console.log(url);

	request.get(url, function(err, response){
		console.log(response.body);
		var result = JSON.parse(response.body);
		callback(result.id);
	});

};

GroupHandler.get_group = function(username, scope, callback){
	var url = 'http://121.40.158.110:8000/relation/' + scope + '/';

	console.log(url);
	url += username;

	request.get(url, function(err, response){
		var group_list = [];
		console.log(response.body);
		var result = JSON.parse(response.body);
		group_list.push(result.id);
		callback(group_list);
	});
};

GroupHandler.get_relation_id = function(username, callback){
	this.get_group(username, 'relation_id', callback);
};

GroupHandler.get_friend_id = function(username, callback){
	this.get_group(username, 'friend_id', callback);
};
