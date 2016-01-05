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

Service.prototype.update_relation = function(msg, callback){

	var url = 'http://localhost:3000/relation/create';

	debugger;
	var post = {
		inviter: msg.data.inviter,
		invitee: msg.data.invitee,
		scope: msg.data.scope,
		home_id: msg.data.home_id,
		invitee_position: msg.data.invitee_position,
	};

	var relation_info = [];

	request.post({
		url:url, 
		form: post
	}, function(err, httpRes, body){
		debugger;

		if(err) throw err;

		if(httpRes.statusCode == 200){
			var relation_data = body;

			var NEW_CONTACT = 'new_contact';

			var new_create_relation = relation_data.relation;

			debugger;
			for(var i = 0; i < new_create_relation.length; i++){
				// generate the create info to exist_person
				debugger;
				var p2p_message_to_exist_person = {};
				p2p_message_to_exist_person.data.home_id = relation_data.home_id;
				p2p_message_to_exist_person.data.new_contact = new_create_relation[i].friend;
				p2p_message_to_exist_person.data.relation = new_create_relation[i].relation;
				p2p_message_to_exist_person.to = new_create_relation[i].receiver.user_id;
				p2p_message_to_exist_person.event = NEW_CONTACT;

				relation_info.push(p2p_message_to_exist_person);
				// generate to create infor to invitee;

				var p2p_message_to_invitee = {};
				p2p_message_to_invitee.to = new_create_relation[i].friend.user_id;
				p2p_message_to_invitee.data.new_contact = new_create_relation[i].receiver;
				p2p_message_to_invitee.data.relation = new_create_relation[i].converse_relation;
				p2p_message_to_invitee.to = new_create_relation[i].receiver.user_id;
				p2p_message_to_invitee.event = NEW_CONTACT;
				relation_info.push(p2p_message_to_invitee);
			}
			callback(relation_info);
		}
	});
};

Service.prototype.set_message_to_accept = function(unique_code){
	PersonToPerson.set_p2p_message_read(unique_code);
};
