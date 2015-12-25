/*
 * Test cases for person to group's group service
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

var Service = require('../group_service.js');

function test_get_all_group(){
	var service = new Service();

	var username = '17862710056';
	service.get_all_joined_groups(username, function(groups){
		console.log('groups..');
		console.log(groups);
	});
}

if(require.main == module){
	test_get_all_group();
}
