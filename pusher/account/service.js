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


AccountService.prototype.check_exist = function(username, callback){
	handler.user_exist(username, function(results){
		var existed = results[0];
		var target_user = Object.keys(existed)[0];
		callback(existed[target_user]);
	});
};

AccountService.prototype.register_user = function(username, socket_id){
	handler.register_client(username, socket_id);
};

AccountService.prototype.set_user_online = function(username, socket_id){
	handler.set_user_online(username, socket_id);
};
