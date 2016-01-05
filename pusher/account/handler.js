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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socket_account');

var _ = require('ramda');

mongoose.Promise = require('q').Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var AccountSchema = mongoose.Schema({
	_id: String,
	username: String,
	socket_id: String,
	join_time: {type: Date, default: Date.now()},
	online: Boolean,
	error: {type: Boolean, default: false},
});

var Account = mongoose.model('socket_user', AccountSchema);

/*
 * Register a new user in client table.
 *
 * @param {String} username
 * @param {socket_id} socket_id
 * @api public
 *
 */

var register_client = function(username, socket_id){
	
	var account = new Account({
		_id: username,
		username: username,
		socket_id: socket_id,
		online: true,
	});

	account.save();
};

/*
 * Check if this user in client table.
 *
 * @param {String} username
 * @callback parser of query result.
 * @api public
 *
 */

var check_user_exist = function(username, callback){

	Account.findOne({username: username}, function(err, user){
		if(err) throw err;

		if(user){
			callback(true);
		}else{
			callback(false);
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

var set_user_online = function(username, socket_id){

	Account.update({username: username}, {socket_id: socket_id, online: true}, function(err, raw){
		if(err) throw err;
	});
};

/*
 * Sets user offline
 *
 * @param {String} socket_id
 * @api public
 *
 */

var set_user_offline = function(socket_id){

	var restriction = {
		socket_id: socket_id
	};

	Account.update(restriction, {oneline: false}, function(err, user){
		if(err) throw err;
	});
};

/*
 * Sets all online to be offline.
 *
 * @api public
 *
 */

var set_all_online_offline = function(){

	var restriction = {
		online: true
	};

	Account.update(restriction, {online: false}, {mutil: true}, function(err, user){
		if(err) throw err;
	});
};

module.exports = {
	check_user_exist: check_user_exist,
	register_client: register_client,
	set_user_offline: set_user_offline,
	set_all_online_offline: set_all_online_offline,
};
