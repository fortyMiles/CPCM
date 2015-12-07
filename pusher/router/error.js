/*
 * Defines error messages.
 *
 * @author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-17 Tue
 */

module.exports = Errors;

/*
 * The error messages send to client.
 */

function Errors(){
	this.TYPE = 'TYPE';
	this.NSET = 'NSET'; // No Such Event Type
	this.LKEY = 'LKEY';
	this.TOKEN = 'TOKEN';

	this.MSG = {
		TYPE:{error: ' type, need to be a json data.'},
		NSET:{error: 'No Such Event Type'},
		LKEY:{error: 'Lack Of Keys'},
		TOKEN:{error: 'Token is invalid'}
	};

}
