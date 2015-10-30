/*
 *
 *
 * 
 *
 *
 *
 *
 */


var request = require('request');
User.socket_user = {socket_id: null, user_name: null};
User.login_users = {}; // formate {name:varchar()}, to save all the logined user;
User.user_info = {socket:null, socket_id:null};
User.unread_messages = {};  //unread_messages = {'username':message_list};
/* define User static variable end */

/* define User static method.*/

User.get_socket_by_name = function(user_name){
    var user_info = User.login_users[user_name];
    return User.login_users[user_name].socket;
};

User.is_login = function(user_name){
    console.log('test if '+ user_name + ' in login users');
    console.log(User.login_users);
    return user_name in User.login_users;
};

User.add_one_unread_message = function(user_name,message){
    /*
     * add a message to one user's unread list.
     */
    if(!(user_name in User.unread_messages)){
        User.unread_messages[user_name] = [];
    }
    User.unread_messages[user_name].push(message);

    console.info('unread list');
    console.info('******************************');
    console.log( user_name + ' has an unread message');
    console.log(message);
    console.info('******************************');
    console.info(User.unread_messages);
};

User.is_registerred = function(user_name){
    // send get requiey to Django to ask if this person be registerred.
    return true;
};

User.send_invitation_phone_text = function(user_name){
    // let django server send a phone text to let person know someone has invited him.
    console.log('send a message to his phone');
};

User.update_relation = function(sender, receiver, relation){
    User. update_friend_list(sender, receiver, relation);
    User. update_relation_database(sender, receiver, relation);
};


User.ensure_relation = function(sender, receiver, relation, nickname){
    var host = 'http://127.0.0.1:8000';
    var url = host + '/account/relation/';

    var form_data  = {
        user1: sender,
        user2: receiver,
        relation: relation,
        nickname: nickname
    }



    request.post({url:'http://127.0.0.1:8000/account/relation/', form: form_data}, function(err,httpResponse,body){
        if (err) {
            return console.error('upload failed:', err);
        }
            console.log('send successful!  Server responded with:', body);
    });

};


User.logout = function(user_name){
    return delete User.login_users[user_name];
};

User.disconnect = function(socket){

    /*
     * one socket disconnect.
     * delete one user information by a socket.
     * ----
     *	args:
     *		socket: the need to delete user's socket.
     *	returns:
     *		delete: Boolean, if delete successfully.
     */

    var user_name = User.socket_user[socket];
    console.log('log out ' + user_name);
    delete User.socket_user[socket];
    return delete User.login_users[user_name];
};

User.create_relation = function(from, to, nickname, relation){
    // create a new relation between from user and to user.
    // but this relation's status have not send to the receiver's contract.

};

User.get_user_socket = function(user_name){
    /*
     * gives a socket by user name;
     * args:
     *	user_name: the user's name.
     *
     * returns:
     *	socket: this socket bind with this user.
     *
     */
    return User.login_users.user_name.socket;
};

/* define User static method end.*/

function User(){

    this.set_information = function(user_name, socket, socket_id){
        this.user_name = user_name;
        this.socket = socket;
        this.socket_id = socket_id;
    };

    this.test = function(){
        console.log('hello ~');
        console.log('hi i am ' + this.user_name);
        console.log('value == ' + User.on_line_person);
        User.on_line_person++;
    };

    this.login = function(){
        /*
         * add user information to loggin list.
         */
        var user_info = {socket: this.socket, socket_id: this.socket_id};

        User.login_users[this.user_name] = user_info;
        User.socket_user[this.socket] = this.user_name;

        console.log('logined users');
        console.log(User.login_users);
        console.log('log a user ');
    };

    this.has_unread_message = function(){
        /*
         * to check this user whether have unread_message.
         */
        return user.user_name in User. unread_messages;
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
        console.log(this.user_name + ' un read message');
        console.log(User.unread_messages);
        return User.unread_messages[this.user_name];
    };


    this.delete_unread_message = function(){
        return delete User.get_unread_messages[this.user_name];
    };

}


User. ensure_relation('18868108012', '18868108013', '亲戚', '8=777777777777七舅老爷');
/*
   user.login();
   user.test();
   console.log(User.is_login('minchiuan'));
   console.log(user.add_one_unread_message(' message 0'));
   console.log(user.add_one_unread_message(' message 1'));
   console.log(user.have_unread_message());
   console.log(user.get_unread_messages());
   console.log(User.value);


   var new_user = new User('mike', 'socket 2', 122);
   new_user.test();

   console.info(User.get_socket_by_name('minchiuan'));
   */
module.exports = User
