/*
 * Test cases of acception.service
 *
 */

var Service = require('../service.js');

function test_update_realtion(){
	var service = new Service();
	
	var msg = {
		from: '18857453090',
		to: '13777414593',
		data:{
			'relation':'弟弟',
			'nickname':'大宝'
		}
	};

	service.update_relation(msg, function(user){
		console.log(user + ' is your friend');
	});
}

function test_set_to_read(){
	var msg = {
		from: '18857453090',
		to: '13777414593',
		data:{
			'relation':'弟弟',
			'nickname':'大宝',
			'unique_code': '14483452925131524',
		},
	};


	var service = new Service();

	service.set_message_to_accept(msg);
}

if(require.main == module){
	test_set_to_read();
}
