/*
 * Date handler of p2p message, via mongodb.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-15
 *
 */


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/p2p_message');

var _ = require('ramda');

mongoose.Promise = require('q').Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

function P2PHandler(){

}

var MessageModel = require('./model.js').P2PMessage;

var save_data_to_model = function(DataModle, msg){
	var new_model = new DataModle(msg);
	new_model.save(function(err, feed){
		if(err) console.log(err);
		console.log('insert succeed');
		return true;
	});
};

P2PHandler.prototype.save_a_new_message = _.curry(save_data_to_model)(MessageModel); // save_a_new_message is save a Message to Model.

var set_message_model_to_read = function(message_model, unique_code){

	var restiction = {unique_code: unique_code};

	message_model.find(restiction, function(err, message){
		if(err) console.error(err);
		message.map(function(msg){ 
			msg.change_to_read();
		});
	});

};

P2PHandler.prototype.set_message_to_read = _.curry(set_message_model_to_read)(MessageModel);


var get_offline_message_from_model = function(message_model, receiver, event, callback){
	console.log('test');

	var	restriction = {
		to: receiver,
		event: event,
		status: 'U'
	};

	message_model.find(restriction, '-_id -__v -status', function(err, messages){
		if(err) return false;
		callback(messages);
		return true;
	});
};

P2PHandler.prototype.get_offline_message = _.curry(get_offline_message_from_model)(MessageModel);

var get_message_by_code = function(unique_code, callback){
	var restriction = {
		unique_code: unique_code
	};

	MessageModel.findOne(restriction, '-_id -__v ', function(err, message){
		callback(message);
	});
};

module.exports = {
	P2PHandler: P2PHandler,
	save_data_to_model: save_data_to_model,
	set_message_model_to_read: set_message_model_to_read,
	get_offline_message_from_model: get_offline_message_from_model,
	get_message_by_code: get_message_by_code,
};
