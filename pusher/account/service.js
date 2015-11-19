/*
 * Connects to database
 * 1. parse the query result
 * 2. parse the saved message.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Wed
 *
 */

/*
 * module exports
 *
 */
module.exports = AccountService;

var Handler = require('./model/handler.js'),
	handler = new Handler();

function AccountService(){
	// void
}

/*
 * Checks if the user is in db already.
 *
 * @param {string} username
 * @callback the opeartion when use is exist or not exists in table.
 * @api public
 *
 */

AccountService.prototype.check_exist = function(username, callback){
	handler.user_exist(username, function(results){
		var existed = results[0];
		var target_user = Object.keys(existed)[0];
		callback(existed[target_user]);
	});
};

/*
 * Registers a new user.
 *
 * @param {String} username
 * @param {String} socket_id
 * @api public
 *
 */

AccountService.prototype.register_user = function(username, socket_id){
	handler.register_client(username, socket_id);
};

/*
 * Sets a user to online 
 * 
 * @param {String} username
 * @param {String} socket_id
 * @api public
 *
 */

AccountService.prototype.set_user_online = function(username, socket_id){
	handler.set_user_online(username, socket_id);
};

/*
 * Sets a user to offline
 *
 * @param {string} socket_id
 * @api public
 *
 */

AccountService.prototype.set_user_offline = function(socket_id){
	handler.set_user_offline(socket_id);
};

/*
 * Sets all online to be offline.
 *
 * @api public
 *
 */

AccountService.prototype.set_all_online_offline = function(){
	handler.set_all_online_offline();
};
