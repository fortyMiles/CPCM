/*
 * Handle for receive a new relation create.
 *
 * @Author Minchiuan Gao <minchiuan.gao@gmail.com>
 * @Date 2015-29-Dec
 *
 */

var notify = function(msg){
	var receiver = msg.receiver;
	var friend = msg.friend;
	var relation = msg.relation;

	console.log(receiver + 'add a new friend: ' + friend + ' ' + relation);
};

module.exports = {
	notify: notify,
};
