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

function test_get_offline_mnnessage(){
	var groupname = '77414593144741054108';
	var lgmc = '14480135841881524';
	
	var service = new Service();

	service.get_offline_message(groupname, lgmc, function(messages){
		for(var i in messages){
			console.log(messages[i]);
		}
	});
}

if(require.main == module){
	test_get_offline_mnnessage();
}

