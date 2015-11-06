/*
 * Operation with unread messages.
 * Save the message in waiting list and get a in wait list.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-6
 */

module.exports = WaitMessages;

function WaitMessages(){
    var Set = require('collection').Set,
        messages = new Set();

    var close = false;

    var set_close = function(){
        close = true;
    };

    var could_write = function(){
        return !close;
    };

    this.close_list = function(callback){
        set_close();
        callback();
    };

    this.open = function(){
        close = false;
    };

    this.add = function(msg){
        if(could_write()){
            messages.add(msg);
        }
    };

    this.get = function(){
        
        set_close();
        if(messages.isEmpty()){
            console.log('empty');
            return null;
        }else{
            var msg = messages.get(0);
            messages.removeAt(0);
            return msg;
        }
    };

    var empty = function(){
        return Object.keys(wait_messages).length === 0;
    };
}

if(require.main == module){
    var wait_message = new WaitMessages();
    wait_message.add('msg1');
    wait_message.add('msg2');
    console.log(wait_message.get());
    console.log(wait_message.get());
}
