/*
 * Test cases of p2p/service
 *
 * @author Minchiuan Gao<minchiuan.gao@gmail.com>
 *
 * Build Date: 2015-Nov-19 Thu
 *
 */

var Service = require('../service.js');

function test_generate_code(){
	var service = new Service();
	var msg1 = {
		name: "Jhone",
		age:10
	};

	var msg2 = {
		name: "Jhone",
		age:11
	};

	msg1 = service.decorate_message(msg1);
	msg2 = service.decorate_message(msg2);
	console.log(msg1);
	console.log(msg2);
}

function test_save_message(){
	var service = new Service();

	var msg = {
		data:{time:"now", picture:123},
		from: 'Minchiuan',
		unique_code: '1232412312412'
	};

	service.save_a_new_message(msg, 'Minhua', 'events');
}

function test_get_offline(){
	var service = new Service();
	var username = 'left';

	service.get_offline_person_to_person_message(username, function(messages){
		for(var i in messages){
			console.log(messages[i]);
		}
	});
}

if(require.main == module){
	test_get_offline();
}
