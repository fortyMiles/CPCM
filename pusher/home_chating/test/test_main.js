/*
 * Test cases of main.js of p2g
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-20 Fri
 *
 */

var P2G = require('../main.js');
var Socket = require('../../test/socket.js');

function test_get_offline_msg(){
	var socket = new Socket();

	P2G.send_group_offline_message(groupname, lgmc, socket);
}

function test_emit_offline(){
	var username = '13777414593';
	var lgmc = '14480135841881524';
	var socket = new Socket();

	var p2g = new P2G(null, socket);
	p2g.initiate_group(username, lgmc, socket);
}

if(require.main == module){
  test_emit_offline();
}
