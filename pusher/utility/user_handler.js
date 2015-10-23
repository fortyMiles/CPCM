/*
 * Maintain user information in run time.
 * 
 * Author: Minchiuan Gao <mqgao@outlook.com>
 * Date: 2015-Oct-22
 */

module.exports = User;

function User(user_name, socket, socket_id){

	var	socket_user = {socket_id: null, user_name: null},
		logined_users = {}, // formate {name:varchar()}, to save all the logined user.
		user_info = {socket:null, socket_id:null};
		unread_messages = {}, // unread_messages = {'username':message_list};
		// some message send to a user, but this user not logined when send to him.
		// wait_messages = {name:message_info};
		// 
		
	this.user_name = user_name;
	this.socket = socket;
	this.socket_id = socket_id;



	this.test = function(){
		console.log('hello ~');
		console.log('hi i am ' + this.user_name);
	};

	this.login = function(){
		/*
		 * add user information to loggin list.
		 */
		var user_info = {socket: this.user_socket, socket_id: this.user_soccket_id};
		
		logined_users[this.user_name] = user_info;
		socket_user[this.user_socket] = this.user_name;
	};

	this.have_unread_message = function(){
		/*
		 * to check this user whether have unread_message.
		 */
		return this.user_name in unread_messages;
	};

	this.get_unread_messages = function(){
		/*
		 * give a user's all unread messagees;
		 * ---
		 *  args: 
		 *    name: username
		 *    type: string
		 *    description: user's name
		 *
		 *  returns:
		 *    the unread message list.
		 */
		return unread_messages[this.user_name];
	};

	this.is_login = function(){
		/*
		 * test user if logged in.
		 */
		return this.user_name in logined_users;
	};

	this.add_one_unread_message = function(message){
		/*
		 * add a message to one user's unread list.
		 */
		
		if(!this.have_unread_message()){
			unread_messages[this.user_name] = [];
		}

		unread_messages[this.user_name].push(message);
	};

	this.get_user_socket = function(user_name){
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

var user = new User('minchiuan', 12, 111);
user.login();
console.log(user.is_login());
console.log(user.add_one_unread_message(' message 0'));
console.log(user.add_one_unread_message(' message 1'));
console.log(user.have_unread_message());
console.log(user.get_unread_messages());
