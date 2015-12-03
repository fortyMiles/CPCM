/*
 * Handle the feed event.
 *
 * @author Minchiuan Gao<minchiuan.gao@gmail.com>
 * @Date: 2015-Dec-04
 *
 */

/*
 * Module Exports
 *
 */

module.exports = Feed;

var Service = require('./service.js');

function Feed(IO_SERVER){
	if(IO_SERVER){
		Feed.IO_SERVER = IO_SERVER;
	}
}

/*
 * io server.
 *
 * @method static
 *
 */

Feed.IO_SERVER = null;

/*
 * Lets a person join all his feed group.
 * @param  {String} username
 * @param  {socket} client socket that will receive the message.
 *
 */

Feed.prototype.join_feed_group = function(username, socket){
};

/*
 * Forwards the feed.
 *
 * @param {JSON} feed message to be send
 * @param {String} receiver
 * @api public
 *
 */

Feed.prototype.forward_message = function(msg, scope, event){
	var service = new Service();

	msg = service.decorate_message(msg);

	var sender = msg.from;
	service.get_group_of_scope(sender, scope, function(group){
	});
};
