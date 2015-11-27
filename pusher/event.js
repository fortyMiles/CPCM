/*
 * Defines different evetns.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17-Tue
 *
 */

module.exports = Events;

function Events(){
	this.LOGIN = 'login';
	this.P2P   = 'p2p';
	this.P2G   = 'p2g';
	this.P2P_ECHO  = 'p2p_echo';
	this.FEED  = 'feed';
	this.INVITATION = 'invitation';
	this.AGREE = 'agree';
	this.ERROR = 'err';
	this.CONNECTION = 'connection';
	this.DISCONNECT = 'disconnect';
	this.RECEPTION = 'reception';
}
