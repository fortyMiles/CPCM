/*
 *
 * Mandates different events with different controller.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17 Tue
 *
 */

var event = require('../event.js');
var error = require('./error.js');

var Login = new require('../login/main.js');
var P2P = new require('../p2p/main.js');
var P2G = new require('../p2g/main.js');
var Echo = new require('../echo/main.js');
var Feed = new require('../feed/main.js');

function Router(msg, socket,events){

}

/*
 * Current socket. To be used as emitting reception message and giving afterworad apps socket_id.
 *
 */

Router.prototype.current_socket = null;

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
		console.log('not a json');
		//this.current_socket(event.ERROR, error.TYPE);
		okay = false;
	}

	if(okay && checker.have_key_missed(msg)){
		//this.current_socket(event.ERROR, error.KEY);
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

Router.prototype.mandate = function(event, msg, socket_id){
	switch(events){
		case events.LOGIN: 
			var login = new Login();
			login(msg, socket_id);
			break;
		case events.P2P: 
			var p2p = new P2P();
			p2p(msg, socket_id);
			break;
		case events.P2G:
			var p2g = new P2G();
			p2g(msg, socket_id);
			break;
		case events.ECHO:
			var echo = new ECHO();
			echo(msg, socket_id);
			break;
	}	
};

Router.prototype.route = function(msg, socket, events){
	this.current_socket = socket;
	
	var formatted = this.check(msg);

	if(formatted){
		this.mandate(event, msg, this.socket.id);
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
	var error = require('./error.js');

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
		if(needed_keys[i] === false){
			missed_key = true;
			break;
		}
	}

	console.log('nis ' + missed_key);
	return missed_key;
};

function main(){
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
	main();
}
