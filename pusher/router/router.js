/*
 *
 * Mandates different events with different controller.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17 Tue
 *
 */

var Event = require('../event.js');
var EVENT = new Event();

var Errors = require('./error.js');
var ERROR = new Errors();

var Account = new require('../account/main.js');
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
 * Check data if is well formatted.
 * If not, emit error event to client socket.
 *
 * @param {Object} message
 * @throws {Error} if msg is not a json, throw a TypeError exception.
 */

Router.prototype.check = function(msg){
	var checker = new MessageChecker(msg);
	var okay = true;
	if(!checker.is_json(msg)){
		throw new TypeError(ERROR.TYPE);
	}

	if(okay && checker.have_key_missed(msg)){
		throw new SyntaxError(ERROR.KEY);
	}
};

/*
 * The login actions when a user login.
 *
 * @param {String} username
 * @param {String} socket_id
 *
 */

Router.prototype.login = function(username, socket_id, callback){
	var account = new Account(username, socket_id);
	account.login(callback);
};

/*
 * The disconnect actions when a user disconnect from server.
 *
 * @param {String} socket_id
 * @api public
 *
 */

Router.prototype.disconnect = function(socket_id){
	var account = new Account(null, socket_id);
	account.change_to_offline();
};

/*
 * Mandates different events.
 * 
 * @param {string} events
 * @param {json} msg
 * @throws {EvalError} if there is no fit event, throws EvalError
 * @api public
 *
 */

Router.prototype.mandate = function(event, msg, socket_id, io_server){
	switch(event){
		case EVENT.LOGIN: 
			this.login(msg.from, socket_id, function(){
				console.log('login succeed');
			});
			break;

		case EVENT.P2P: 
			var p2p = new P2G();
			p2p.send_message(msg, socket_id, io_server);
			break;
		case EVENT.P2G:
			var p2g = new P2G();
			p2g.send_message(msg, socket_id, io_server);
			break;
		case EVENT.ECHO:
			var echo = new ECHO(msg, socket_id, io_server);
			break;
		case EVENT.DISCONNECT:
			this.disconnect(socket_id);break;
		default:
			throw new EvalError(ERROR.NET);
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
	try{
		this.check(msg);
		this.mandate(event, msg, socket.id, io_server);
	}catch(err){
		if(err.message == ERROR.TYPE){
			socket.emit(EVENT.ERROR, ERR.TYPE);
		}else if(err.message == ERROR.NET){
			socket.emit(EVENT.ERROR, ERR.NET);
		}else if(err.message == ERROR.KEY){
			socket.emit(EVENT.ERROR, ERR.KEY);
		}else{
			throw err;
		}
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


