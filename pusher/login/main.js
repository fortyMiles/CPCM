/*
 * Process a client's login event.
 *
 * 1. Saves user's information into database.
 * 2. Gives user's unread P2P messages.
 * 3. Gives user's unread P2G messages.
 * 4. Gives user's unread Inviatoin Messages.
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

