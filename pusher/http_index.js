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
var app = express();

app.use(body_parse.urlencoded({ extended: false }));
app.use(body_parse.json());

app.get('/message/:unique_code', function(req, res){
	message_handler.get_message_by_code(req.params.unique_code, function(message){
		res.status(200);
		res.json(message);
	});
});

var server = app.listen(3001, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening on %s %s', host, port);
});
