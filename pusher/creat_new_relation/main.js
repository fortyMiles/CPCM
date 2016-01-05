/*
 * Process invitation acception.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-24 Mon
 *
 */

/*
 * Module exports
 *
 */

module.exports = Acception;

var Service = require('./service');
var PersonToPerson = require('../person_to_person/main.js');
var event = require('../event.js'),
	EVENT = new event();
function Acception(){
	//void
}

Acception.prototype.accept = function(msg){
    var service = new Service();
	service.update_relation(msg, function(relation_info){
		for(var i = 0; i<relation_info.length; i++){
			var relation = relation_info[i];
			new PersonToPerson().forward_message(relation, relation.to, relation.event);
		}
	});
	
	var unique_code = msg.unique_code;
	service.set_message_to_accept(unique_code);
};
