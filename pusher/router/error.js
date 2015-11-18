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
	this.TYPE = {error: ' type, need to be a json data.'};
	this.NET = {error: 'Not Event Type'};
	this.KEY = {error: ' keys, the key set must contains<from, to, data, event, lgmc>, those could be null, but should have those key'};
}
