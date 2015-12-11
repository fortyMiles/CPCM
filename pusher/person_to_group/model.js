/*
 * Define the feed messages model.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-9
 *
 */


var mongoose = require('mongoose');

var P2GSchema = mongoose.Schema({
	data: Object,
    from: String,
    to: String,
	event: String,
	unique_code: String,
	comment: { type: Number, default: 0},
	date: { type:Date, default: Date.now},
});

P2GSchema.methods.speak = function () {
  var greeting = "My sender is " + this.sender;
  console.log(greeting);
};

P2GSchema.methods.add_comment = function(){
	this.comment += 1;
	this.data.comment += 1;
};

var P2GMessage = mongoose.model('P2GMessage', P2GSchema);

module.exports = {
	P2GMessage: P2GMessage
};
