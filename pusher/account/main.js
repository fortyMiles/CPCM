/*
 * Process a client's login event.
 *
 * 1. Saves/Updates user's information into database.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Wed
 *
 */

/*
 * Module exports.
 */

var account_handler = require('./handler.js');

module.exports = Account;

/*
 * Account Constructor.
 *
 * @param {JSON} msg: client's message
 * @param {string} socket_id of client's socket.
 * @param {socket} server socket.
 *
 */

function Account(username, socket_id, io_server){
	this.client_name = username;
	this.socket_id = socket_id;
	this.io_server = io_server;
}

/*
 * Logins in a client.
 *
 * @callback save user info into db
 * @api public
 *
 */

Account.prototype.login = function(){
	account_handler.check_user_exist(this.client_name, function(exist){
		if(exist){
            account_handler.set_user_online(this.client_name, this.socket_id);
		}else{
			account_handler.register_client(this.client_name, this.socket_id);
		}
	});
};

/*
 * Sets User offline
 * @param {socket_id} socket id of client
 * @api public
 *
 */

Account.prototype.change_to_offline = function(){
	account_handler.set_user_offline(this.socket_id);
};

/*
 * Procedure of a user existd unexcepted.
 *
 * @api public
 */

Account.prototype.exist_unexcepted = function(){
	account_handler.set_all_online_offline();
};
