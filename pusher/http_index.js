/*
 * Http Server for message.
 *
 * @Author Minchiuan Gao <minchiuan.gao@gmail.com>
 * @Date 2015-Dec-25
 *
 */

var express = require('express');
var body_parse = require('body-parser');
var message_handler = require('./person_to_person/handler.js');
var p2g_message_handler = require('./person_to_group/message_handler.js');
var app = express();

app.use(body_parse.urlencoded({ extended: false }));
app.use(body_parse.json());

app.get('/message/unique_code/:unique_code', function(req, res){
	message_handler.get_message_by_code(req.params.unique_code, function(message){
		res.status(200);
		res.json(message);
	});
});

app.get('/message/p2p/history/:receiver_id/:sender_id?', function(req, res){

	var MAX_STRING = Array(20).join("9");
	
	// if no last_unique_code, let last_unique_code be max_string, means, 
	// give all unread message/
	var last_unique_code = req.query.last_unique_code || MAX_STRING;
	var step = req.query.step || 10;

	message_handler.get_histroy_message(
		last_unique_code,
		req.params.receiver_id,
		req.params.sender_id,
		step,
		function(message_set){
			res.status(200);
			res.json(message_set);
		}
	);
});


app.get('/message/p2g/history/:group_id?', function(req, res){
	var MAX_STRING = Array(20).join("9");
	
	// if no last_unique_code, let last_unique_code be max_string, means, 
	// give all unread message/
	var last_unique_code = req.query.last_unique_code || MAX_STRING;
	var step = req.query.step || 10;

	p2g_message_handler.get_history_message(
		last_unique_code,
		req.params.group_id,
		step,
		function(message_set){
			res.status(200);
			res.json(message_set);
		}
	);
});

var server = app.listen(3001, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening on %s %s', host, port);
});
