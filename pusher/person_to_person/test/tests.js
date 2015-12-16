/*
 * Test cases of p2p messages.
 *
 * @author Minchiuan Gao <minchuian.gao@gmail.com>
 * @build date: 2015-Dec-15
 *
 */

var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var Q = require('q');
chai.use(chaiAsPromised);

chai.should();

describe('P2P Data Handler', function(){
	var H = require('../handler.js');
	var handler = new H.P2PHandler();
	var MessageModel = require('../model.js').P2PMessage;

	describe('#save_data_to_model()', function(){
		it('should save message data in db, and return true', function(){
			var data = {
				"data": {"relation": "爷爷", "unique_code": "14483452925131524"},  
				"from": "13777414593", "to":  "12345678910", "event": "agree", "lgmc":"14480164570271572"
			};

			Q.fcall(H.save_data_to_model(MessageModel, data)).should.eventually.equal(true);

		});
	});

	describe('#set_message_model_to_read()', function(){
		it('should save message data in db, and return true', function(){
		});
	});

	describe('#get_offline_message_from_model()', function(){
		it('should save message data in db, and return true', function(){
		});
	});
});
