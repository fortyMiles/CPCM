/*
 * Message Service of Person of Group.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 *
 * Build Date: 2015-Dec-11
 *
 */

/*
 * Module exports
 *
 */

module.exports = P2GMessageService;

var Handler = require('./message_handler.js');
var handler = new Handler();

function P2GMessageService(){
}

/*
 * Decorates a message.
 *
 * @param {JSON} msg
 * @return {JSON} decorated msg
 * @api public
 *
 */

P2GMessageService.prototype.decorate_message = function(msg, callback){
	if(!msg.date){
		msg.date = new Date();
	}

	if(!msg.unique_code){
		msg.unique_code = P2GMessageService.get_unique_code(msg);
	}

	return msg;
};

/*
 * Create a unque code for a message.
 *
 * @param {json} message
 * @return {String} unique code for this message.
 * @api priavet
 *
 */

P2GMessageService.get_unique_code = function(msg){
	var time = new Date().getTime();
	var random = Math.floor((Math.random() * 100) + 1); // create a random number
	var length = msg.toString().length;
	var result = time.toString() + length.toString() + random.toString();
	return Number(result);
};

/*
 * Insert a message into db.
 *
 * @param {json} message.
 * @api public
 *
 */
P2GMessageService.prototype.save_a_new_message = function(msg){
	handler.insert(msg);
};

/*
 * Gets all offline messages from a group.
 *
 * @param {string} groupname
 * @param {string} lgmc last group message code
 * @callback {Function} operation with offline messages.
 * @api public
 *
 */

P2GMessageService.prototype.get_group_offline_message = function(groupname, lgmc, callback){
	handler.get_offline_message(groupname, lgmc, callback);
};

/*
 * Comment a message.
 *
 * @param {string} message code
 */
P2GMessageService.prototype.add_a_comment = function(unique_code){
   handler.comment(unique_code);
};
