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

	var username = '13777414593';
	service.get_all_joined_scopes(username, function(groups){
		for(var i in groups){
			console.log(groups[i]);
		}
	});
}

if(require.main == module){
	test_get_all_group();
}
