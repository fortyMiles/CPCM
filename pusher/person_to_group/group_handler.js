/*
 * db handler for group information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17-Tue
 *
 */

var request = require('request');
var _ = require('ramda');

var get_group = function(feed_only, home_only, user_id, callback){
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
			
			if(!feed_only){ // if feed_only is true, !feed_only is false, not push home info.
				result.data.home.map(function(h){
					group_list.push(h.home);
				});
			}

			if(!home_only){ // if home_only is true,  !home_only is false, not push feed info.
				result.data.feed_group.map(function(f){
					group_list.push(f.group_id);
				});
			}
			callback(group_list);

		}else{
			callback(null);
		}
	});
};

var get_all_group = _.curry(get_group)(false, false); // get all feed group, feed_only and home_only are false neither;

var get_all_feed_group = _.curry(get_group)(true, false); // feed only is true
var get_all_home_group = _.curry(get_group)(false, true); // home only is true

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
	get_all_feed_group: get_all_feed_group,
	get_all_home_group: get_all_home_group,
};
