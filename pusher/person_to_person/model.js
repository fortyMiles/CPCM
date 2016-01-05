/*
 * User Point to Point Mesasge Model.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * @date 2015-Dec-14 17:10
 *
 */

var mongoose = require('mongoose');

var P2PMessageSchema = mongoose.Schema({
	data: Object,
	from: String,
    to: String,
	event: String,
	status: { type: String, default: 'U'}, // message status.
	unique_code: String,
	date: { type: Date, default: Date.now},
	read_date: { type: String}
});


P2PMessageSchema.methods.change_to_read = function(){
	var READ= 'R';
	this.status = READ;
	this.read_date = new Date();
	this.save();
};

var P2PMessage = mongoose.model('P2PMessage', P2PMessageSchema);

module.exports = {
	P2PMessage: P2PMessage
};
