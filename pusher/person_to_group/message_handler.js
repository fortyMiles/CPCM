/*
 * Handler of the data manipualate.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-9
 *
 */

var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/socket');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var P2GMessageModel = require('./model.js').P2GMessage;
var group_handler = require('./group_handler.js');
var _ = require('ramda');


function P2GMessageHandler(){
	
}

/*
 * Insert a new feed message into db.
 *
 * @param {JSON} Json data.
 * @api private
 *
 */

P2GMessageHandler.prototype.insert = function(data){
	var new_feed = new P2GMessageModel(data);
	new_feed.save(function(err, feed){
		if(err) return console.error(err);
		console.log('insert succeed');
	});
};

/*
 * Base on group and lgmc, get offline feeds.
 *
 * @param {String} group
 * @param {String} lgma
 * @callback {Function} Operation with the results.
 * @api private
 *
 */

P2GMessageHandler.prototype.get_offline_message = function(group, lgmc, callback){
	var restriction = {
		to:group,
		unique_code: {$gt: lgmc},
		event: 'p2g',
	};

	P2GMessageModel.find(restriction, '-_id -__v', function(err, feeds){
		if(err) return console.error(err);
		callback(feeds);
	});
};


/*
 * Comment a message.
 * Increase this message's comment number 1.
 *
 * @param {String} unique_code
 * @api private
 *
 */

P2GMessageHandler.prototype.comment = function(unique_code){
	var restriction = {unique_code: unique_code};

	P2GMessageModel.find(restriction, function(err, feeds){
		if(err) return console.error(err);

		for(var i in feeds){
			feeds[i].add_comment();
			feeds[i].save();
		}
	});
};

var get_history_message = function(last_unique_code, group_id, step, callback){
	var restriction = {
		unique_code: {$lt: last_unique_code},
		to: group_id,
	};

	P2GMessageModel.find(restriction, '-_id -__v')
	.limit(Number(step))
	.sort({unique_code: -1})
	.exec(function(err, message_set){
		if(err) throw err;
		callback(message_set);
	});
};

var get_receive_feed = function(newer, user_id, last_unique_code, step, callback){

	group_handler.get_all_group(user_id, function(group_list){

		var unique_code_restrition = null;
		if(newer){
			unique_code_restrition = {$gt: last_unique_code};
		}else{
			unique_code_restrition = {$lt: last_unique_code};
		}

		var restriction = {
			unique_code: unique_code_restrition,
			to: { $in: group_list},
		};

		P2GMessageModel.find(restriction, '-_id -__v')
		.limit(Number(step))
		.sort({unique_code: -1})
		.exec(function(err, message_set){
			if(err) throw err;
			callback(message_set);
		});
	});
};

var get_history_receive_feed = _.curry(get_receive_feed)(false);
var get_unread_receive_feed = _.curry(get_receive_feed)(true);

module.exports = {
	P2GMessageHandler: P2GMessageHandler,
	get_history_message: get_history_message,
	get_history_receive_feed: get_history_receive_feed,
	get_unread_receive_feed: get_unread_receive_feed,
};
