/*
 * Operation with unread messages.
 * Save the message in waiting list and get a in wait list.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-6
 */

module.exports = WaitMessages;

function WaitMessages(){
    var wait_messages = [];

    var could_write = true;

    var close = function(callback){
		could_write = false;
		callback();
	};

    this.open = function(){
        could_write = true;
    };

    this.add = function(msg){
		if(could_write){
			wait_messages.push(push);
		}else{
			console.log('sorry the getting is working..');
		}
    };

	this.get = function(callback){
		close(function(){
			if(wait_messages.length == 0){
				console.log('empty..');
				msg = null;
				callbakc(msg); 
			}else{
				msg = wait_messages.pop();
				callback(msg);
			}
		});
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
