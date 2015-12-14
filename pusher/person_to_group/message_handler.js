/*
 * Handler of the data manipualate.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-9
 *
 */

module.exports = P2GMessageHandler;

var mongoose = require('mongoose');
mongoose.connect('mongodb://121.40.158.110/feed_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var Feed = require('./model.js').P2GMessage;


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
	var new_feed = new Feed(data);
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
		unique_code: {$gt: lgmc}
	};

	Feed.find(restriction, '-_id -__v', function(err, feeds){
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

	Feed.find(restriction, function(err, feeds){
		if(err) return console.error(err);

		for(var i in feeds){
			feeds[i].add_comment();
			feeds[i].save();
		}

	});
};
