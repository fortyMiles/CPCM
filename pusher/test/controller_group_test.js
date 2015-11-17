/*
 * Functional test for contorller/grop.js
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17-Tue
 */

var Socket = require('./socket.js');
	
var Group = require('../controller/group.js');


function test(){
	var group = new Group();
	var socket = new Socket();

	group.initiate_group('13777414593', socket, '123897935');
}

if(require.main == module){
	test();
}

