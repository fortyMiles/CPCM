/*
 * Maintain user information in run time.
 * 
 * Author: Minchiuan Gao <mqgao@outlook.com>
 * Date: 2015-Oct-22
 */

module.exports = UserHandler;

function UserHandler(){

	var	socket_user = {socket_id: null, user_name: null},
		logined_users = {name: null},
		user_info = {socket:null, socket_id:null};
		unread_messages = {name:null},
		// some message send to a user, but this user not logined when send to him.
		// wait_messages = {name:message_info};


	this.test = function(){
		console.log('hello ~');
	};

	this.add_a_login_user = function(username, user_socket, user_soccket_id){
		var user_info = {socket: user_socket, socket_id: user_soccket_id};
		var login_user = {name: user_info};
		
		logined_users.push(login_user);
		socket_user.push({user_soccket_id:username});
	};

	this.is_login = function(user_name){
		return user_name in login_user;
	}

	this.add_to_unread_list = function(username, message){
		// add a message to unread list.
	}

	this.get_socket_by_user = function(user_name){
		/*
		 * gives a socket by user name;
		 * args:
		 *	user_name: the user's name.
		 *
		 * returns:
		 *	socket: this socket bind with this user.
		 *
		 */
		return logined_users.user_name.socket;
	};

	this.delte_by_socket = function(socket){
		// delete one user information by a socket.
		// args:
		//	socket: the need to delete user's socket.
		// returns:
		//  delete: Boolean, if delete successfully.
	};
}

