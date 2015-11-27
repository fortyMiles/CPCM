/*
 * Handler for DB operation for Account DB.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Web
 *
 */

/*
 * Module exports.
 */

module.exports = AccountHandler;

var mysql = require('mysql');
var Mapper = require('./mapper.js'),
	mapper = new Mapper();
var configuration = require('./conf.js'),
	C = new configuration();

var Status = require('./status.js'),
	STATUS = new Status();

/*
 * Account handler constructor.
 *
 */

function AccountHandler(){
	AccountHandler.connection.connect();
}

/*
 * Mysql connection, static var, all the Handler just need to connect once.
 * @api private
 */

AccountHandler.connection = mysql.createConnection({
	host:   C.IP,
	user:   C.USER,
	password: C.PASSWORD,
	database: C.DATABASE
});


/*
 * Register a new user in client table.
 *
 * @param {String} username
 * @param {socket_id} socket_id
 * @api public
 *
 */

AccountHandler.prototype.register_client = function(username, socket_id){
	var post = {
		username: username,
		socket_id: socket_id,
		join_time: new Date()
	};

	var query = AccountHandler.connection.query(mapper.register_client, post, function(err, results){
		if(err) throw err;
		else{
			console.log(results);
		}
	});
};

/*
 * Check if this user in client table.
 *
 * @param {String} username
 * @callback parser of query result.
 * @api public
 *
 */

AccountHandler.prototype.user_exist = function(username, callback){
	var restriction = {
		username: username
	};

	var query = AccountHandler.connection.query(mapper.user_exist, restriction, function(err, results){
		if(err) throw err;
		else{
			callback(results);
		}
	});
};

/*
 * Sets User Online
 *
 * @param {String} username
 * @param {String} socket_id of client
 * @api public
 *
 */

AccountHandler.prototype.set_user_online = function(username, socket_id){
	var post = {
		socket_id: socket_id,
		join_time: new Date(),
		status: STATUS.ON_LINE
	};

	var restriction = {
		username: username
	};

	this.update_user_status(post, restriction);
};

/*
 * Sets user offline
 *
 * @param {String} socket_id
 * @api public
 *
 */

AccountHandler.prototype.set_user_offline = function(socket_id){
	var post = {
		socket_id: socket_id,
		leave_time: new Date(),
		status: STATUS.OFF_LINE
	};

	var restriction = {
		socket_id: socket_id
	};

	this.update_user_status(post, restriction);
};

/*
 * Sets all online to be offline.
 *
 * @api public
 *
 */

AccountHandler.prototype.set_all_online_offline = function(){
	var post = {
		status: STATUS.BREAK_LINE,
		leave_time: new Date()
	};

	var restriction = {
		status: STATUS.ON_LINE
	};

	this.update_user_status(post, restriction);
};


/*
 * Updates user status
 *
 * @param {Dictionary} post information
 * @param {Dictionary} restriction
 * @api private
 *
 */

AccountHandler.prototype.update_user_status = function(post, restriction){
	var query = AccountHandler.connection.query(mapper.set_user_status, [post, restriction], function(err, results){
		if(err) throw err;
		else{
			console.log(query.sql);
			console.log(results);
		}
	});
};
