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

module.exports = Login;

/*
 * Login Constructor.
 *
 * @param {JSON} msg: client's message
 * @param {string} socket_id of client's socket.
 * @param {socket} server socket.
 *
 */

function Login(msg, socket_id, io_server){
	this.msg = msg;
	this.socket_id = socket_id;
	this.io_server = io_server;
}

/*
 * Check this msg if is new registed socket.
 * @param {string} username the client's name
 * @api private
 *
 */

Login.prototype.is_new_client = function(username){
};

/*
 * Check if this msg is reconnection socket.
 * @param {string} username the client's name
 * @api private
 *
 */

Login.prototype.is_reconnnection = function(username){
};

/*
 * Registers new client info into db.
 *
 * @param {String} username
 * @param {String} socket_id
 * @api private
 *
 */

Login.prototype.registe_client = function(username, socket_id){

};

/*
 * Sets User online.
 * @param {string} username
 * @param {string} socket_id
 * @api private
 *
 */

Login.prototype.set_client_online = function(username, socket_id){

};
