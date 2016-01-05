/*
 * Processs of invitation.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-24
 *
 */

/*
 * Module exports
 *
 */

module.exports = Invitation;

var Service = require('./service.js');
var P2P = require('../person_to_person/main.js');

/*
 * Constructor of Invitation
 *
 */

function Invitation(io_server){
	if(io_server){
		Invitation.IO_SERVER = io_server;
	}
}

/*
 * IO Server. The Socket IO Server, shared by every Invitation server which followed 
 * by this IO Server.
 *
 * @api private
 *
 */

Invitation.IO_SERVER = null;

Invitation.prototype.send_invitation = function(msg, receiver, event){
	var service = new Service();
	service.check_user_exist(receiver, function(result){
		if(result.exist){
			new P2P(Invitation.IO_SERVER).forward_message(msg, result.user_id, event);
		}else{
			// send a invitation messages.
			service.send_invitation(msg, receiver);
		}
	});
};
