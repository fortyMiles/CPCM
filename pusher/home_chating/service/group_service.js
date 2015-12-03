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
 * Gets one user's all joined groups
 *
 * @param {string} username
 * @callback operation with those groups
 * @api public
 *
 */

GroupService.prototype.get_all_joined_scopes = function(username, callback){
	group_handler.get_scopes(username, function(scopes){
		callback(scopes);
	});
};


