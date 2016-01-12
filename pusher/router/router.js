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
var PersonToPerson = new require('../person_to_person/main.js');
var PersonToGroup = new require('../person_to_group/main.js');
var Echo = new require('../echo/main.js');
var Feed = new require('../feed/main.js');
var Invitation = new require('../invitation/main.js');
var jwt = new require('jsonwebtoken');

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
	var checker = new MessageChecker();
	var okay = true;
	if(!checker.is_json(msg)){
		throw new TypeError(ERR.TYPE);
	}

	if(okay && checker.have_key_missed(msg)){
		throw new SyntaxError(ERR.LKEY);
	}

	checker.check_token(msg.from, msg.token, function(token_valid){
		if(!token_valid){
			throw new SyntaxError(ERR.TOKEN);
		}
	});
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
	new PersonToPerson().add_online_socket(username, socket_id);
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


Router.prototype.mandate = function(event, msg, SOCKET, IO_SERVER, callback){
	switch(event){
		case EVENT.LOGIN: 
			this.login(msg.from, SOCKET.id);
			new PersonToPerson(IO_SERVER).send_offline_message(msg.from.trim(), EVENT.P2P);
			new PersonToPerson(IO_SERVER).send_offline_message(msg.from.trim(), EVENT.INVITATION);
			new PersonToGroup(IO_SERVER, SOCKET).initiate_group(msg.from.trim(), msg.lgmc, SOCKET);
			break;

		case EVENT.AGREE:
			new PersonToPerson(IO_SERVER).forward_message(msg, msg.to, EVENT.AGREE);
			break;

		case EVENT.P2P: 
			new PersonToPerson(IO_SERVER).forward_message(msg, msg.to, EVENT.P2P);
			break;
		
		case EVENT.FEED:
			new PersonToGroup(IO_SERVER, SOCKET).forward_message(msg, msg.to, EVENT.FEED);
			break;

		case EVENT.P2G:
			new PersonToGroup(IO_SERVER, SOCKET).forward_message(msg, msg.to, EVENT.P2G);
			break;

		case EVENT.INVITATION:
		    new Invitation(IO_SERVER).send_invitation(msg, msg.to, EVENT.INVITATION);
			break;

		case EVENT.DISCONNECT:
			this.disconnect(SOCKET.id);
			break;


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
	var checker = new MessageChecker();
	try{
		this.check(msg);
		msg = checker.decorate_message(msg);
		this.mandate(event, msg, SOCKET, io_server, function(){
			var return_msg = {
				event: event,
				unique_code: msg.unique_code,
				client_message_code: msg.client_message_code
			};
			SOCKET.emit(EVENT.RECEPTION, return_msg);
		});
	}catch(err){
		if(err.message == ERR.TYPE){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.TYPE);
		}else if(err.message == ERR.NSET){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.NSET);
		}else if(err.message == ERR.LKEY){
			SOCKET.emit(EVENT.ERROR, ERR.MSG.LKEY);
		}else if(err.message == ERR.TOKEN){
			SOCKET.emit(EVENT.ERROR, {
				error: ERR.MSG.TOKEN, 
				event: event,
				client_message_code: msg.client_message_code
			});
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

/*
 * Check if this token is valid.
 *
 */

MessageChecker.prototype.check_token = function(account, token, callback){
	var token_valid = false;

	if(token){
		var secret = 'foremly';
		jwt.verify(token, secret, function(err, decode){
			debugger;
			if(!err && decode.user == account){
				token_valid = true;
			}
			callback(token_valid);
		});
	}else{
		callback(true);
	}
};


/*
 * Decorate the raw message. Add server time and unique_code.
 * 
 * @param msg JSON
 *
 */

MessageChecker.prototype.decorate_message = function(msg, callback){
	if(!msg.date){
		msg.date = new Date();
	}

	if(!msg.unique_code){
		msg.unique_code = MessageChecker._get_unique_code(msg);
	}

	return msg;
};

/*
 * Create a unque code for a message.
 *
 * @param {json} message
 * @return {String} unique code for this message.
 * @api priavet
 *
 */

MessageChecker._get_unique_code = function(msg){
	var time = new Date().getTime();
	var random = Math.floor((Math.random() * 100) + 1); // create a random number
	var length = msg.toString().length;
	var result = time.toString() + length.toString() + random.toString();
	return Number(result);
};



if(require.main == module){
	var Checker = new MessageChecker();
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMTM5OTMzMDAwMDMzMjI0ODU0ODMiLCJpYXQiOjE0NTI1OTA2NDYsImV4cCI6MTQ1MjU5MDgyNn0.--Y2mz1nkEsHLwCRNREDt1gImBAFqnV0kSAzToryxEo';
	Checker.check_token('13993300003322485483', token, function(is_valid){
		console.log('valid: ' + is_valid);
	});
}
