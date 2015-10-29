/*
 * Change server to single event.
 * Author: Minchiuan Gao <mimchiuan.gao@gmail.com>
 * Date: 2015-Oct-29
 */

function MainServer(port){

    var io = require('socket.io'),
    events = new require('./configration/status.js');

    var e = new events(),
    User = require('./utility/user_handler.js');

    var Message = require('./configration/message.js'),
    m = new Message();

    this.io_server = io.listen(port);
    this.socket = null;

    var message = {type:null, sender:null, receiver:null, message:null};

    this.events_handler = function(socket){
        console.info('a new client connects you, ( id == ' + socket.id + ' )');
        socket.emit(e.CHAT_MESSAGE, {'message':'you are connected!'});

        socket.on(e.CHAT_MESSAGE, function(msg){
            var type = msg.type.trim();
            switch(type){
                case e.LOGIN:
                    login(msg.name.trim(), socket);
                    send_unread_message(user);
                    send_ensure_message(msg.name.trim(), socket);
                    break;

                case e. INVITATION:
                    var sender = msg.from.trim();
                    var receiver = msg.to.trim();
                    var nickname = msg.nickname.trim();
                    var speak = 'hi, ' + nickname + ' ' + ' wo 是' + sender + ' 一起加入麦粒吧~ ';
                    var message = {type: "invitation", from: sender, to: receiver, message: speak};
                    if(User.is_registerred(receiver)){
                        if(User.is_login(sender) && User.is_login(receiver)){
                            console.log(message);
                            var destination_socket = User.get_socket_by_name(receiver);
                            destination_socket.emit(e. CHAT_MESSAGE, message); // router the message to the receiver;
                            var sender_socket = User.get_socket_by_name(sender);
                            sender_socket.emit(e. CHAT_MESSAGE, {'type':'send success'});
                        }
                    } 
                    break;

                case e. CHAT:
                    var sender = msg.from.trim();
                    var receiver = msg.to.trim();
                    send_message(sender, receiver, msg);
                    break;
            }
        });
    };

    var send_unread_message = function(user){
        if(user.have_unread_message()){
            var unread_messages = user.get_unread_message();

            for(var index = 0; index < unread_messages.length; index++){
                this.socket.emit(unread_messages[index].events, unread_messages[index].message);
            }
            /* !!! notice, need to add a receive confire from client, it's just test code */
            user.delete_unread_message();
        }
    };

    var send_ensure_message = function(name, socket){
        // sends to name an ensure message
        var send_message = {type: e.LOGIN, message: 'hello ' + name};
        socket.emit(e.CHAT_MESSAGE, send_message); 
    };

    var login = function(name, socket){
        user = new User(name, socket, socket.id);
        user.login();
        return user;
    };

    var send_message = function(sender, receiver, msg){
        /* sends a message from sender to receiver.
         * 
         * args:
         *	sender: sender's account name
         *	receiver: receiver's account name
         *	message: message content
         *	send_event: which events neeed send to receiver, such as 'chat message', 'invitation', etc
         *	feedback_events: which events when send success give back to sender.
         *
         */
        msg.server_date = new Date().getTime();

        if(User.is_login(sender) && User.is_login(receiver)){
	    var destination_socket = User.get_socket_by_name(receiver);
	    destination_socket.emit(e. CHAT_MESSAGE, msg); // router the message to the receiver;
	    var sender_socket = User.get_socket_by_name(sender);
            var feedback = {type:'send_success'};
	    sender_socket.emit(e. CHAT_MESSAGE, feedback);
	}else{
	    if(!User.is_login(sender)){
		console.log('user not login');
	     }
	        // add message to a receiver's unread message.
	    if(!User.is_login(receiver)){
	        User.add_one_unread_message(receiver, e. CHAT_MESSAGE, msg);
	    }
	}
    };

    this.run = function(){
        /* 
         * run a new process to handle connection.
         */
        console.log('server start');
        this.io_server.on(e.CONNECTION, this.events_handler);
    };
}

var server = new MainServer(3000);
server.run();
