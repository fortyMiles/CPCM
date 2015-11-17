/*
 * Manipulates groups information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17 Tue
 *
 */

module.exports = GroupService;

var GroupHanlder = require('../dao/group_handler.js'),
	group_handler = new GroupHanlder();

var MessageHandler = require('../dao/message_handler.js'),
	message_handler = new MessageHandler();


/*
 * Initiate Group service
 */

function GroupService(){

}

/*
 * Parses groups information.
 *
 * @param {QuerySet} results group messages
 * @return {Array} the array of group
 * @api priavte
 *
 */

GroupService.prototype.parse_groups = function(results){
	var groups = [];
	
	for(var i in results){
		var g = JSON.parse(results[i].group);
		groups.push(g);
	}

	return groups;
};

/*
 * Gets one user's all joined groups
 *
 * @param {string} username
 * @callback operation with those groups
 * @api public
 *
 */

GroupService.prototype.get_all_joined_groups = function(username, callback){
	group_handler.get_groups(username, function(results){
		var groups = GroupService.prototype.parse_groups(results);
		callback(groups);
	});
};

/*
 * Gets all offline messages
 *
 * @param {string} groupname
 * @param {string} lgmc last group message code
 * @callback {Function} operation with offline messages.
 * @api public
 *
 */

GroupService.prototype.get_offline_message = function(groupname, lgmc, callback){
	message_handler.get_group_offline_messages(groupname, lgmc, function(results){
		var messages = GroupService.prototype.parse_messages(results);
		callback(messages);
	})	;
};


/*
 * Parses goup offlline message from QuestSet
 *
 * @param {QuerySet} results
 * @return {Array} messages array
 * @api private
 *
 */

GroupService.prototype.parse_messages = function(results){
	var messages = [];

	for(var i in results){
		var m              = {};
		m.sender           = results[i].sender;
		//m.message          = JSON.parse(results[i].message);
		m.message          = results[i].message;
		m.group            = results[i].group;
		m.unique_code      = results[i].unique_code;
		m.create_date      = results[i].create_date;
		m.event            = 'group';
		messages.push(m);
	}

	return messages;
};

function main(){
	var gs = new GroupService();
	gs.get_all_joined_groups('13777414593', function(groups){
		console.log(groups);
	});
	/*
   gs.get_offline_message('group', '123897936', function(messages){
		for(var i in messages){
			console.log(messages[i]);
		}
   });
   */
}

if(require.main == module){
	main();
}
