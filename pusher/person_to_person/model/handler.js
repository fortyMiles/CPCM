/*
 * CRUD for p2p message.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-19 Thu
 *
 */

/*
 * Module exports
 *
 */

module.exports = P2PHandler;

var mysql = require('mysql');
var Mapper = require('./mapper.js'),
	mapper = new Mapper();
var configuration = require('./conf.js'),
	C = new configuration();

var Status = require('./status.js'),
	STATUS = new Status();

/*
 * P2P handler 
 *
 */
function P2PHandler(){
	//void
}

/*
 * Mysql connection, static var, all the Handler just need to connect once.
 * @api private
 */

P2PHandler.connection = mysql.createConnection({
	host:   C.IP,
	user:   C.USER,
	password: C.PASSWORD,
	database: C.DATABASE
});

P2PHandler.connection.connect();

/*
 * Inserts a message into db.
 *
 * @param {string} sender
 * @param {string} receiver
 * @param {string} message
 * @param {string} event
 * @param {unique_code} unique_code
 *
 */

P2PHandler.prototype.save_a_new_message = function(sender, receiver, message, event, unique_code){
	var post = {
		message : message,
		status : STATUS.UNREAD,
		sender : sender,
		receiver : receiver,
		event: event,
		create_date: new Date(),
		unique_code: unique_code
	};

	var query = P2PHandler.connection.query(mapper.save_a_new_message, post, function(err, result){
		if(err) throw err;
	});

	console.log(query.sql);
};
