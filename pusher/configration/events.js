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

	// 
	// chat page
	// chat page
	// invitation page
	// log out page
	// login page
	// login page
	// notification page
	// 不管，掉线
	this.ADD_USER = 'add user';
	this.ALL = 'ALL';
	this.CHAT= 'chat';
	this.CHAT_MESSAGE = 'chat message';
	this.CONNECTION = 'connection';
	this.DISCONNECT = 'disconnect';
	this.ERROR = 'error';
	this.FEED= 'feed';
	this.FORBIDDEN = 'forbidden';
	this.INFORMATION_RECEIVED = 'information received';
	this.INVITATION = 'invitation';
	this.INVITATION_ACCEPT = 'invitation accpet';
	this.LOGIN = 'login';
	this.LOGOUT = 'off';
	this.NEW_FRIEND = 'new friend';
	this.RECEIVER_HAS_READ = 'receiver has read';
	this.SENT_TO_RECEIVER = 'sent to receiver';
	this.SENT_TO_SERVER = 'send to server';
        this.ACCEPT_INVITATION = 'accept';

        this.NEW_MESSAGE = 'new message';

	this.test = function(){
		console.log('test');
	};
}

module.exports = Events;


