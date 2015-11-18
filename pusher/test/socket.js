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

Socket.prototype.id = Math.random();

Socket.prototype.emit = function(event, msg){
	console.log('************************ EVENT *********************');
	console.log('emit event: ' + event);
	console.log('************************ MSG *********************');
	console.log('emit msg: ' + JSON.stringify(msg));
};

Socket.prototype.join = function(room){
	console.log('join to room ' + room + 'success');
};
