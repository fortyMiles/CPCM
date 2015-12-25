/*
 * Message Service of Person to Group
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 *
 * Build Date: 2015-Nov-20 Fri
 *
 */

/*
 * Module exports
 *
 */

module.exports = P2GMessageService;

var Handler = require('../model/message_handler.js');

function P2GMessageService(){
	this.handler = new Handler();
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
 * Saves this data to group message database;
 * 
 * @param {json} msg
 * @api public
 */

P2GMessageService.prototype.save_a_new_message = function(msg, group){

	var message = JSON.stringify(msg.data);
	var sender = msg.from.trim();
	var unique_code = msg.unique_code;
	var event = msg.event;
	this.handler.save_group_message(sender, group, message, unique_code, event);
};


/*
 * Parses goup offlline message from QuestSet
 *
 * @param {QuerySet} results
 * @return {Array} messages array
 * @api private
 *
 */

P2GMessageService.parse_messages = function(results){
	var messages = [];

	for(var i in results){
		var m = {};
		try{
			m.data = JSON.parse(results[i].message);
		}catch(err){
			console.log(err);
		}
		m.from = results[i].sender;
		m.to = results[i].group;
		m.unique_code = results[i].unique_code;
		m.date= results[i].create_date;
		m.event = results[i].event;

		messages.push(m);
	}

	return messages;
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

	this.handler.get_group_offline_message(groupname, lgmc, function(results){
		var messages = P2GMessageService.parse_messages(results);
		callback(messages);
	});
};
