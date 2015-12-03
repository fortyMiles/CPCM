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

/*
 * Sets a message to read.
 *
 * @param {String} unique_code
 * @api public
 *
 */

P2PHandler.prototype.set_message_to_read = function(unique_code, query_time){
	query_time = query_time || 1;

	var MAX_TRY_TIME = 100;
	if(query_time > MAX_TRY_TIME){
		throw Error('no this message!');
	}

	var post = {
		status: STATUS.READ,
		read_date: new Date()
	};

	var restriction = {
		unique_code: unique_code
	};

	var query = P2PHandler.connection.query(mapper.set_message_to_read, [post, restriction], function(err, results, fields){
		if(err) throw err;
		var affected = Number(results.affectedRows);
		if(affected){
			console.log(affected);
		}else{
			P2PHandler.prototype.set_message_to_read(unique_code, query_time + 1);
		}

		console.log(fields);
	});
};

/*
 * Gets one user's offline messages from db
 *
 * In the beginning, we get all the message once a time, but if a person has too many messages, we could catch a patch and a patch. to reduce boardwidth and decrease waiting time.
 *
 * @param {string} username
 * @return {list} results list
 *
 */

P2PHandler.prototype.get_offline_message = function(username, event, callback){

	var query = P2PHandler.connection.query(
		mapper.get_off_line_messages,
		[
			{receiver: username},
			{event: event}
		],
		function(err, results){
		if(err){
			console.log(query.sql);
			throw err;
		}else{
			console.log(query.sql);
			callback(results);
		}
	});
};
