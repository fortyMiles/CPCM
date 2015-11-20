/*
 * Handler for echo message.
 *
 * @author Minchiuan Gao <minchiuan@gmail.com>
 * Date: 2015-Nov-20 Fir
 */

/*
 * Module exports
 *
 */

module.exports = Echo;

var PersonToPerson = require('../person_to_person/main.js');

function Echo(){
	//void
}

/*
 * Handles for person to person message echo.
 *
 * @param {JSON} msg
 * @api public
 *
 */

Echo.prototype.person_to_person_echo = function(msg){
	var unique_code = msg.unique_code;
	PersonToPerson.set_p2p_message_read(unique_code);
};


