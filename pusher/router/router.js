/*
 *
 * Mandates different events with different controller.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17 Tue
 *
 */

var Event = require('../event.js');
var e = new Event();

var Errors = require('./error.js'),
	error = new Errors();

var Login = new require('../login/main.js');
var P2P = new require('../p2p/main.js');
var P2G = new require('../p2g/main.js');
var Echo = new require('../echo/main.js');
var Feed = new require('../feed/main.js');

/*
 * Module exports
 *
 */
module.exports = Router;

function Router(){

}

/*
 * Current socket. To be used as emitting reception message and giving afterworad apps socket_id.
 *
 */

Router.prototype.current_socket = null;

/*
 * Current io socket server.
 *
 */

Router.prototype.io_server = null;

/*
 * Check data if is well formatted.
 * If not, emit error event to client socket.
 *
 * @param {Object} message
 * @api private
 */

Router.prototype.check = function(msg){
	var checker = new MessageChecker(msg);
	var okay = true;
	if(!checker.is_json(msg)){
		this.current_socket.emit(e.ERROR, error.TYPE);
		okay = false;
	}

	if(okay && checker.have_key_missed(msg)){
		this.current_socket.emit(e.ERROR, error.KEY);
		okay = false;
	}

	return okay;
};

/*
 * Mandates different events.
 * 
 * @param {string} events
 * @param {json} msg
 * @api public
 *
 */

Router.prototype.mandate = function(event, msg, socket_id, io_server){
	switch(event){
		case e.LOGIN: 
			var login = new Login();
			login(msg, socket_id, io_server);
			break;
		case e.P2P: 
			var p2p = new P2P();
			p2p(msg, socket_id, io_server);
			break;
		case e.P2G:
			var p2g = new P2G();
			p2g(msg, socket_id, io_server);
			break;
		case e.ECHO:
			var echo = new ECHO();
			echo(msg, socket_id, io_server);
			break;
		default:
			this.current_socket.emit(e.ERROR, error.NTE);
	}	
};

/*
 *
 * Router's main function. Router different msg and socket to it's proper app.
 *
 * @param {Object} client's msg
 * @param {Socket} Socket of client
 * @param {String} socket's event
 *
 */
Router.prototype.route = function(msg, socket, event, io_server){
	this.current_socket = socket;
	this.io_server = io_server;
	var formatted = this.check(msg);

	if(formatted){
		this.mandate(event, msg, this.current_socket.id, this.io_server);
	}
};


/*
 * Message format checker.
 *
 */
function MessageChecker(){
}

/*
 *
 * Checks msg if is a json.
 *
 * @param {msg} message needed to be checked
 * @return {Boolean} return if is json.
 * @api private
 *
 */

MessageChecker.prototype.is_json = function(msg){
	var json_constructor = {}.constructor;
	return msg.constructor === json_constructor;
};

/*
 * Check is this msg is well formatted.
 *
 * @param {msg} message needed to be checked
 * @return {Boolean} is have missed key, return true, else return false
 * @api private
 *
 */

MessageChecker.prototype.have_key_missed= function(msg){
	var needed_keys = {
		event:null, 
		from:null, 
		to:null, 
		data:null, 
		lgmc:null
	};

	var missed_key = false;
	
	for(var k in msg){
		needed_keys[k] = true;
	}

	for(var i in needed_keys){
		if(!needed_keys[i]){
			missed_key = true;
			break;
		}
	}

	return missed_key;
};

function test(){
	var router = new Router();

	var msg = {
		data  : {message : '你在的吗'},
		from  : 'right',
		to    : 'left',
		event : 'chat message',
		lgmc  : 'chat message'
	};

	console.log(router.check(msg));
}

if(require.main == module){
	test();
}
