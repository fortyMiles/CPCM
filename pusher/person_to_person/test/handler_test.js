/*
 * Test cases of p2p messages.
 *
 * @author Minchiuan Gao <minchuian.gao@gmail.com>
 * @build date: 2015-Dec-15
 *
 */

var assert = require('assert');


var H = require('../handler.js');
var handler = new H.P2PHandler();
var MessageModel = require('../model.js').P2PMessage;

var data = {
	"data": {"relation": "爷爷", "unique_code": "14483452925131524"},  
	"from": "13777414593", "to":  "12345678910", "event": "agree", "lgmc":"14480164570271572"
};

H.save_data_to_model(MessageModel, data);

handler.get_offline_message('12345678910', 'agree', function(messages){
	console.log(messages);
});
