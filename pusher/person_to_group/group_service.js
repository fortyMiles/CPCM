/*
 * Manipulates groups information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17 Tue
 *
 */

module.exports = GroupService;

var GroupHanlder = require('./group_handler.js'),
	group_handler = new GroupHanlder();


/*
 * Initiate Group service
 */

function GroupService(){

}

/*
 * Parses groups information.
 *
 * @param {QuerySet} results group messages
 * @return {Array} the array of group
 * @api priavte
 *
 */

GroupService.parse_groups = function(results){
	var groups = [];
	
	for(var i in results){
		var g = results[i].group;
		groups.push(g);
	}

	return groups;
};

GroupService.show_group = function(group_list){
	for(var i in group_list){
		console.log('-------------');
		console.log(group_list[i]);
	}
};
/*
 * Gets one user's all joined groups
 *
 * @param {string} username
 * @callback operation with those groups
 * @api public
 *
 */

GroupService.prototype.get_all_joined_groups = function(username, callback){
	GroupService.prototype.get_all_joined_home(username, callback);
	GroupService.prototype.get_all_joined_friend(username, callback);
	GroupService.prototype.get_all_joined_relation(username, callback);
};

GroupService.prototype.get_all_joined_home = function(username, callback){
	GroupHanlder.get_homes(username, function(group_list){
		callback(group_list);
	});
};

GroupService.prototype.get_all_joined_friend = function(username, callback){
	GroupHanlder.get_friend_id(username, function(group_list){
		callback(group_list);
	});
};

GroupService.prototype.get_all_joined_relation = function(username, callback){
	GroupHanlder.get_relation_id(username, function(group_list){
		callback(group_list);
	});
};
