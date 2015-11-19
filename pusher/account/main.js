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
 * Logins in a client.
 *
 * @callback save user info into db
 * @api public
 *
 */

Account.prototype.login = function(callback){

	account_service.check_exist(
		this.client_name,
		this.save_into_db.bind(this)
	);

	callback();
};

/*
 * Login a user. if it's not exited before, registet it, or set it online.
 * @param {Boolean} existed If user existed in table before.
 * @api private
 *
 */

Account.prototype.save_into_db = function(exist){
	if(exist){
		this.change_to_online();
	}else{
		this.register();
	}
};

/*
 * Register a new cllient.
 *
 * @param {string} username
 * @param {socket_id} socket_id
 * @api private
 *
 */

Account.prototype.register = function(){
	account_service.register_user(this.client_name, this.socket_id);
};


/*
 * Sets User online.
 * @param {string} username
 * @param {string} socket_id
 * @api private
 *
 */

Account.prototype.change_to_online = function(){
	account_service.set_user_online(this.client_name, this.socket_id);
};

/*
 * Sets User offline
 * @param {socket_id} socket id of client
 * @api public
 *
 */

Account.prototype.change_to_offline = function(){
	account_service.set_user_offline(this.socket_id);
};
