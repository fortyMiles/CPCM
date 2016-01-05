/*
 * db handler for group information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17-Tue
 *
 */

var request = require('request');

var get_all_group = function(user_id, callback){
	var group_list = [];
	var url = 'http://localhost:3000/account/info/';

	url += user_id;

	console.log(url);

	request.get(url, function(err, response){
		console.log(response.body);

		var group_list = [];
		var res_data = response.body;
		if(response.statusCode == 200 && _is_json_string(res_data)){

			var result = JSON.parse(res_data);
			result.data.home.map(function(h){
				group_list.push(h.home_id);
			});

			result.data.feed_group.map(function(f){
				group_list.push(f.group_id);
			});
			callback(group_list);

		}else{
			callback(null);
		}
	});
};

var _is_json_string = function(str){
	try{
		JSON.parse(str);
	}catch(e){
		return false;
	}
	return true;
};

module.exports = {
	get_all_group: get_all_group,
};
