/*
 * Test cases of service.
 *
 * @author Minchuian Gao <minchiuan.gao@gmail.com>
 *
 */

var assert = require('assert');
var Service = require('../service.js');

function test_check_exist(){
	var service = new Service();

	var username = '18857453090';
	service.check_user_exist(username, function(exist){
		assert.equal(exist, true);
	});
}

if(require.main == module){
	console.log('**************** TEST BEGIN ****************');
	test_check_exist();
	console.log('**************** TEST END ****************');
}
