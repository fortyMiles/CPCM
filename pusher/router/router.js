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
var ERR = new Errors();

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
		throw new TypeError(ERR.TYPE);
	}

	if(okay && checker.have_key_missed(msg)){
		throw new SyntaxError(ERR.LKEY);
	}
};

/*
 * The login actions when a user login.
 *
 * @param {String} username
 * @param {String} socket_id
 *
 */

Router.prototype.login = function(username, socket_id){
	new Account(username, socket_id).login();
};

/*
 * The disconnect actions when a user disconnect from server.
 *
 * @param {String} socket_id
 * @api public
 *
 */

Router.prototype.disconnect = function(socket_id){
	new Account(null, socket_id).change_to_offline();
};

/*
 * The Clean Up opeartions when a socket existed unexcepted.
 *
 * @api public
 *
 */

Router.prototype.clean_up = function(){
	new Account(null, null).exist_unexcepted();
};

/*
 * Mandates different events.
 * 
 * @param {string} events
 * @param {json} msg
 * @throws {EvalError} if there is no fit event, throws EvalError
 * @callback When receive the message and proceduced, send back to client an ensure msg.
 * @api public
 *
 */

Router.prototype.mandate = function(event, msg, socket_id, io_server, callback){
	switch(event){
		case EVENT.LOGIN: 
			this.login(msg.from, socket_id);
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
			throw new EvalError(ERR.NSET);
	}	

	callback();
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

Router.prototype.route = function(msg, SOCKET, event, io_server){
	try{
		this.check(msg);
		this.mandate(event, msg, SOCKET.id, io_server, function(){
			SOCKET.emit(EVENT.RECEPTION);
		});
	}catch(err){
		if(err.message == ERR.TYPE){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.TYPE);
		}else if(err.message == ERR.NSET){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.NSET);
		}else if(err.message == ERR.LKEY){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.LKEY);
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


