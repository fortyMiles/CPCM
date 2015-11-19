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

var Status = require('./Status.js'),
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
 *
 */

AccountHandler.prototype.set_client_online = function(username, socket_id){
	var post = {
		socket_id: socket_id,
		join_time: new Date(),
		status: STATUS.ON_LINE
	};

	var restriction = {
		username: username
	};

	var query = AccountHandler.connection.query(mapper.set_user_on_line, [post,restriction], function(err, results){
		if(err) throw err;
	});
};
