/*
 * The reception of message.
 * 
 * When receive a message, *reception* add some appendix information and save into the database.
 * 
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Oct-30
 *
 */

function Reception(){
    var io = require('socket.io'),
    events = new require('./configration/status.js');

    var eventEmitter = require('events').EventEmitter
    
    var e = new events(),
    User = require('./utility/user_handler.js');

    var mongo = require('mongodb');
    var mongo_client = mongo.MongoClient

    this.port = null;
    this.io_server = null;
    this.message_database_url = null;
    this.data_base = 

    this.set_port = function(port){
        this.port = port;
        this.io_server = io.listen(port);
    };

    var save_message_to_db = function(message){
    };

    var connect_db_test = function(){};

    var event_handler = function(socket){
        console.infor('a new client connected id = '+ socket.id);
    };

    this.run = function(){
        if(this.port){
            console.log('reception server start in port ' + this.port);
            this.io_server.on(e.CONNECTION, this.events_handler);
        }else{
            console.log('please set the port before run server.');
            console.log('server end');
        }
    };
}

var reception = new Reception();
reception.set_port(3000);
