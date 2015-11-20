/*
 * Manipulates groups information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17 Tue
 *
 */

module.exports = GroupService;

var GroupHanlder = require('../model/group_handler.js'),
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

/*
 * Gets one user's all joined groups
 *
 * @param {string} username
 * @callback operation with those groups
 * @api public
 *
 */

GroupService.prototype.get_all_joined_groups = function(username, callback){
	group_handler.get_groups(username, function(results){
		var groups = GroupService.parse_groups(results);
		callback(groups);
	});
};


