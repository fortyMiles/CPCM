/*
 * Recives other module's request and CRUD information to database.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 *
 */

module.exports = MessageService;
function MessageService(){
    var data_handler = require('../dao/data_handler.js'),
        db_handler = new data_handler();

    this.save_a_new_message = function(msg){
        /*
         * save this data to message database;
         * 
         * ---
         *  paremeter:
         *
         *  name: data
         *  type: json
         *  
         */
        var message = JSON.stringify(msg.data);
        var sender = msg.data.from.trim();
        var receiver = msg.data.to.trim();
        db_handler.insert(sender, receiver, message);
    };

    this.parse_message = function(results){
        console.log(results);
        var messages = [];
        var message = {};
        if(results.length === 0){
            console.log('no message');
        }

        for(var i in results){
                console.log('result is not null');
                message.data = JSON.parse(results[i].message);
                message.from = results[i].sender;
                message.to = results[i].receiver;
                message.date = results[i].create_date;
                message.id = results[i].id;
                console.log(message);
                messages.push(message);
        }

        console.log('point 1');
        console.log(messages);
        return messages;
    };

    this.get_user_unread_message = function(person_name, callback){

        /* 
         * Get a user's unread message.
         *
         * parameter:
         *  - name: person_name
         *    descirption: if person_name is null, get all the message by time sort, if not null, get this one's messages.
         */
        db_handler.get_earliest(callback, person_name);
    };


    this.get_all_unread_message = function(callback){
        /*
         * retrive from message data, get a unread message.
         * 
         */
        db_handler.get_earliest(callback, null);
    };


    this.set_a_unread_message_to_read = function(record_id){
        db_handler.set_message_to_read(recod_id);
    };

}


function main(){
    var message_service = new MessageService();

    var data = {
        message: '你在的吗',
        from: '高民权',
        to: '王小丫',
    };

    var message = {
        type: 'invitation',
        data: data,
    };

    //message_service.save_a_new_message(message);

    var name = '18857453090';
    message_service.get_unread_message(name);
}

if(require.main == module){
    main();
}
