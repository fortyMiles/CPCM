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
	msg1 = {
		name: "Jhone",
		age:10
	};

	msg2 = {
		name: "Jhone",
		age:11
	};

	msg = service.decorate_message(msg1);
	msg = service.decorate_message(msg2);
	console.log(msg1);
	console.log(msg);
}

if(require.main == module){
	test_generate_code();
}
