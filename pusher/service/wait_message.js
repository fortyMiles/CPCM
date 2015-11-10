/*
 * Operation with unread messages.
 * Save the message in waiting list and get a in wait list.
 *
 * Author: Minchiuan Gao<minchiuan.gao@gmail.com>
 * Date: 2015-Nov-6
 */

module.exports = WaitMessages;

function WaitMessages(){
	var Q = require('q');
    var wait_messages = [];

    var could_write = true;

    var close = function(){
		/*
		 * close the message block. 
		 */
		could_write = false;
	};

    var open = function(){
		/*
		 * open the write blocks.
		 *
		 */
        could_write = true;
    };

    this.add = function(msg){
		/*
		 * add the msg to message block. 
		 * If could written for write blcok.
		 *
		 */
		if(could_write){
			wait_messages.push(msg);
		}else{
			console.log('sorry the getting is working..');
		}
    };

	var process_message = function(callback){
		if(empty()){
			console.log('waiting pool is empty');
		}else{
			msg = wait_messages.pop();
			callback(msg);
		}
	};

	this.get_new = function(callback){
		/*
		 * user js promise to synchrosize the process of
		 * get element.
		 *
		 * first close the write block, ater get, open the block.
		 */
		Q.fcall(close).then(
			process_message(callback) 
			// in this section, call callback is send an unread message in MessageService.
		).then(open).done();
	};

	var empty = function(){
		/*
		 * test if the message if empty.
		 */
		return wait_messages.length == 0;
	};
}


if(require.main == module){
	var wait_message = new WaitMessages();
	wait_message.add('msg1');
	wait_message.add('msg2');

	wait_message.get(function(msg){
		console.log(msg);
	});

	wait_message.add('msg3');

	wait_message.get_new(function(msg){
		console.log(msg);
	});
}
