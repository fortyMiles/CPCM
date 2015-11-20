/*
 * Group Message Handler.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

/*
 * Module exports.
 *
 */

module.exports = GroupMessagerHandler;

var mysql = require('mysql');

var Mapper = require('./mapper/messages.js'),
	mapper = new Mapper();

var Conf = require('./conf/message_conf.js'),
	c = new Conf();

function GroupMessagerHandler(){
	//void 
	GroupMessagerHandler.connection.connect();
}

/*
 * DB Connection.
 * 
 */

GroupMessagerHandler.connection = mysql.createConnection({
	host:   c.IP,
	user:   c.USER,
	password: c.PASSWORD,
	database: c.DATABASE
});


/*
 * Saves group message.
 * @param {string} sender
 * @param {string} message: message data
 * @param {string} unique_code: message's unique code
 * @param {string} group: from with group name
 * @api public
 *
 */

GroupMessagerHandler.prototype.save_group_message = function(sender, group, message, unique_code){
	console.log(Number(unique_code));
	var post = {
		sender: sender,
		message: message,
		unique_code: unique_code,
		group: group,
		create_date: new Date(),
	};

	var query = GroupMessagerHandler.connection.query(mapper.save_group_message, post, function(err, result){
		if(err) throw err;
	});
};
