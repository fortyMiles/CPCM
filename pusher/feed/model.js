/*
 * Handler of the data manipualate.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-9
 *
 */


var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Feed = new Schema({
	code: ObjectId,
	sender: String,
	message: String,
	picture: Array,
	tag: Array,
	receiver: Array,
	unique_code: String,
	date: Date
});

Feed.methods.speak = function(){
	console.log('this is send from ' + this.sender);
};

var MyFeed =  mongoose.model('Feed', Feed);

MyFeed.sender = "Sender";

var instance = new MyFeed();
instance.save();
