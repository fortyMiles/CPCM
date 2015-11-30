/*
 * Accpetion service
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-24 Mon
 *
 */

/*
 * Module exports
 *
 */

module.exports = Service;

var request = require('request');
var PersonToPerson = require('../person_to_person/main.js');

function Service(){
	// void
}

Service.prototype.update_relation = function(msg){
	var person_from = msg.from;
	var person_to = msg.to;
	var relation = msg.data.relation;
	var nickname = msg.data.nickname;

	var post = {
		user1: person_from,
		user2: person_to,
		relation: relation,
		nickname: nickname
	};

	var url = 'http://127.0.0.1:8000/relation/';

	request.post(url, {form: post}, function(err, httpRes, body){
		var results = JSON.parse(body).status;
	});
};

Service.prototype.set_message_to_accept = function(unique_code){
	PersonToPerson.set_p2p_message_read(unique_code);
};


