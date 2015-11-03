/*
 * Handle the user operation of the socket.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-3
 */


module.exports = UserService;
function UserService(){
    var request = require('request');

    var data_handler = require('../dao/data_handler.js'),
        db_handler = new data_handler();

    var HttpService = require('./http_servie.js'),
        http_handler = new HttpService();


    this.get_socket_by_name = function(username){
        db_handler.get_user_socket(username, function(socket){
            console.log(socket);
        });
    };

    this.check_user_login = function(username){
        db_handler.get_user_status(username, function(status){
            console.log(status);
        });
        
    };

    this.login_one_user = function(username, socket_id, socket){
        socket = JSON.stringify(socket);
        db_handler.user_login(username, socket_id, socket);
    };

    this.user_is_registerred = function(username){
        return true;
    };

    this.create_relation = function(sender, receiver, relation, nickname){
        http_handler.ensure_relation(sender, receiver, relation, nickname);
    };


    this.send_invitation_phone_text = function(user_name){
        // send to one a invitation text.
    };

    this.get_one_user_unread_message = function(user_name, callback){
        // get one person's all unread messages;
    };


    this.logout = function(username){
        /*
         * changes one user's status to 'off'
         */
        db_handler.set_user_off_line(username);
    };

    this.disconnect = function(socket){
        /*
         * change user's status to 'break'
         */
        var socket_id = socket.id;
        db_handler.set_user_break_line(socket_id);
    };
}


function test(){
    var user_service = new UserService();

    var socket = {name: 'socket', id:'12313uoi53hafdc', message: 'lwdhlakhdkashdklahsd'};
    var username = '18857453091';
    //user_service.login_one_user(username, socket.id, socket);
    //user_service.get_socket_by_name(username);
    //user_service.check_user_login(username);
    //user_service.logout(username);
   user_service.disconnect(socket);
}

test();
