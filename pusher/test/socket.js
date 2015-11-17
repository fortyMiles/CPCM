/*
 *
 * A very simple socket for functional test.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-27-Tue
 *
 */

module.exports = Socket;

function Socket(){
}

Socket.prototype.emit = function(event, msg){
	console.log('emit event: ' + event);
	console.log('emit msg: ' + msg);
};

socket.prototype.join = function(room){
	console.log('join to room ' + room + 'success');
};
