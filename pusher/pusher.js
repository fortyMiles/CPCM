/* 
 * A pusher server that accept the socketio's events
 * and transmit this message to this message's receiver.
 *
 * The process is:
 *  
 *      1. first receive a message, and put the message to our database;
 *      2. pusher check if there is a message in database, if have, send this message.
 *      3. send back to send to tell this message has been sent.
 *      4. loop this process.
 *      
 * The important is, check a unread message databases.
 * The data in this database could from this pusher, or other place.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Oct-30
 *
 */

function Puser(){

    var io = require('socket.io'),
    events = new require('./configration/status.js');

    var e = new events(),
    User = require('./utility/user_handler.js');

    this.port = null;
    this.io_server = null;
    this.message_database_url = null;

    this.set_port = function(port){
        this.port = port;
        this.io_server = io.listen(port);
    };

    this.run = function(){
        if(this.port){
            console.log('server start in port ' + this.port);
            this.io_server.on(e.CONNECTION, this.events_handler);
        }else{
            console.log('please set the port before run server.');
            console.log('server end');
        }
    };
}

var server = new Puser();
server.set_port(3000);
server.run();
