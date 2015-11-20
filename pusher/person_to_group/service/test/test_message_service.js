/*
 * Test cases of message service.
 *
 * @author Minchiuan Gao <minchuan.gao@gmail.com>
 * Bulid Date: 2015-Nov-20 Fri
 *
 */

var Service = new require('../message_service.js');

function test_save_msg(){
	var service = new Service();

	var msg = {
		data:{message:''},
		from: 'TEST FROM',
		unique_code: '1231451243'
	};

	service.save_a_new_message(msg, 'GROUP TEST ', 'p2g');
}

if(require.main == module){
	test_save_msg();
}

