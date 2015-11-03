/*
 * Recives other module's request and CRUD information to database.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 *
 */

function Service(){
    var data_handler = require('./data_handler.js');

    var mysql = new data_handler();

    this.save_a_new_message = function(data){
        /*
         * save this data to message database;
         */
        mysql.insert(data);
    };

    this.get_a_unread_message = function(){
        /*
         * retrive from message data, get a unread message.
         * 
         */
        mysql.get_earliest(function(message){
            console.log(message);
        });
    };
}


function test(){
    var service = new Service();

    var data = {
            type: 'invitation',
            message: '你在的吗',
    };

    var message = {
        from: '刘德华',
        to: '王小丫',
        data: data,
    };

    //service.save_a_new_message(message);

    service.get_a_unread_message();
    
}

test();
