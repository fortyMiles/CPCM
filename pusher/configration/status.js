/*
 *
 * Configuration of conversation events.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Oct-23
 *
 */

function Events(){
	/*
	 * Define connection events.
	 */
	this.CONNECTION = 'connection';
	this.DISCONNECT = 'disconnect';
	this.CHAT_MESSAGE = 'chat message';
	this.INVITATION = 'invitation';
	this.ADD_USER = 'add user';
	this.INFORMATION_RECEIVED = 'information received';
	this.ERROR = 'error';
	this.LOGIN = 'login';
	this.LOGOUT = 'logout';
	this.SENT_TO_RECEIVER = 'sent to receiver';
	this.SENT_TO_SERVER = 'send to server';
	this.RECEIVER_HAS_READ = 'receiver has read';

	this.test = function(){
		console.log('test');
	};
}

module.exports = Events


