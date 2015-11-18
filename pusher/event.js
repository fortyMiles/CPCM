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
	this.ECHO  = 'echo';
	this.FEED  = 'feed';
	this.ERROR = 'error';
	this.CONNECTION = 'connection';
	this.DISCONNECT = 'disconnect';
}
