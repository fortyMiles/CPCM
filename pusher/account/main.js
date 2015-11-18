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

var AccountService = require('./service.js'),
	account_service = new AccountService();

module.exports = Account;

/*
 * Account Constructor.
 *
 * @param {JSON} msg: client's message
 * @param {string} socket_id of client's socket.
 * @param {socket} server socket.
 *
 */

function Account(msg, socket_id, io_server){
	this.client_name = msg.from;
	this.socket_id = socket_id;
	this.io_server = io_server;
}

/*
 *
 * Logins in a client.
 *
 * @api public
 */

Account.prototype.login = function(){
	account_service.is_new_user(username, function(exist){
		if(exist){
			AccountService.prototype.set_client_online(username, socket_id);
		}else{
			AccountService.prototype.register_client(
				AccountService.prototype.client_name,
				AccountService.prototype.socket_id
			);
		}
	});

};

/*
 * Register a new cllient.
 *
 * @param {string} username
 * @param {socket_id} socket_id
 * @api private
 *
 */

Account.prototype.register_client = function(){
	account_service.register_user(this.client_name, this.socket_id);
};


/*
 * Sets User online.
 * @param {string} username
 * @param {string} socket_id
 * @api private
 *
 */

Account.prototype.set_client_online = function(username, socket_id){
	account_service.set_user_online(username, socket_id);
};

