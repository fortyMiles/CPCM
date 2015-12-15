/*
 * Data Service of P2P communication.
 *
 * @author Minchiuan Gao <minchiuan@gmail.com>
 * Build Date: 2015-Nov-19
 *
 */

/*
 * Module exports.
 *
 */

var Handler = require('./handler.js').P2PHandler;

module.exports = P2PService;

/*
 * Constructor of P2PService.
 *
 */

function P2PService(){
	this.db_handler = new Handler();
}

/*
 * Decorates the raw messages.
 *
 * @param {json} the raw message
 * @return {json} decorated message
 * @api public
 *
 */

P2PService.prototype.decorate_message = function(msg, callback){
	if(!msg.date){
		msg.date = new Date();
	}

	if(!msg.unique_code){
		msg.unique_code = P2PService._get_unique_code(msg);
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

P2PService._get_unique_code = function(msg){
	var time = new Date().getTime();
	var random = Math.floor((Math.random() * 100) + 1); // create a random number
	var length = msg.toString().length;
	var result = time.toString() + length.toString() + random.toString();
	return Number(result);
};

/*
 * Saves this data to message database;
 * 
 * @param {json} msg
 * @api public
 */

P2PService.prototype.save_a_new_message = function(msg){
	this.db_handler.save_a_new_message(msg);
};

/*
 * Sets a message to read.
 *
 * @param {string} unique_code
 * @api public
 *
 */

P2PService.prototype.set_message_to_read = function(unique_code){
	this.db_handler.set_message_to_read(unique_code); 
};

/*
 * Gets offline messages of a person.
 *
 * @param {string} receiver name
 * @callback function to deal with getted messages
 * @api public
 *
 */

P2PService.prototype.get_offline_person_to_person_message = function(receiver, event, callback){
	this.db_handler.get_offline_message(receiver, event, function(results){
		callback(results);
	});
};
