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

    var data = {from:'18857453091',
            to: '13993300082',
            message: '你在的吗',
    };

    //service.save_a_new_message(data);

    service.get_a_unread_message();
    
}

//test();
