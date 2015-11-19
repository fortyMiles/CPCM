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

var Handler = require('./model/handler.js');

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
		msg.unique_code = this.get_unque_code(msg);
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

P2PService.prototype.get_unque_code = function(msg){
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

P2PService.prototype.save_a_new_message = function(msg, receiver, event){
	var message = JSON.stringify(msg.data);
	var sender = msg.from.trim();
	var unique_code = msg.unique_code;

	this.db_handler.save_a_new_message(sender, receiver, message, event, unique_code);
};

