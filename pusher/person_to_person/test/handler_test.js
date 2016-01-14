/*
 * Test cases of p2p messages.
 *
 * @author Minchiuan Gao <minchuian.gao@gmail.com>
 * @build date: 2015-Dec-15
 *
 */

var assert = require('assert');


var H = require('../handler.js');

var last_unique_code = "14527538934681568";
var receiver_id = "13993300008893802883";
var sender_id = "13993300003322485483";
var step = 5;

H.get_histroy_message(last_unique_code, receiver_id, sender_id, step, function(message_set){
	message_set.map(function(m){
		console.log(m);
	});
});
