/*
 * Test Cases of feed.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * @Date: 2015-Dec-11
 *
 */

var assert = require('assert');

var FeedHandler = require('./handler.js');


function FeedHandlerTest(){
	var test_data = {
		data: {
			message: "Hello world", 
			phote: ['phote1', 'photo2']
		},
		from: "18857453090",
		to: "3627616849902847647",
		event: "feed",
		lgmc: "14480164570271572",
		unique_code: "14480164570271577",
	};

	var handler = new FeedHandler();

	this.test_insert = function(){
		handler.insert(test_data);
	};

	this.test_get_offline_feeds = function(){
		var group = '77414593144741054108';
		var lgmc = '14480164570271575';
		handler.get_offline_feeds(group, lgmc, function(results){
			for(var i in results){
				console.log(results[i]);
			}
		});
	};

    this.test_add_comment = function(){
		var unique_code = '14480164570271577';
		handler.comment(unique_code);
	};
}

if(require.main == module){
	var handler_test = new FeedHandlerTest();
	//handler_test.test_insert();
	//handler_test.test_get_offline_feeds();
	handler_test.test_add_comment();
}
