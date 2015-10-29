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
                    var name = msg.name.trim();
                    var user = login(name, socket);
                    var send_message = {message: 'hello ' + name};
                    socket.emit(e.CHAT_MESSAGE, send_message); 
                    send_unread_message(user);
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

    var login = function(username, socket){
        user = new User(username, socket, socket.id);
        user.login();
        return user;
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
