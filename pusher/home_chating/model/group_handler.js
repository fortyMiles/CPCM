/*
 * db handler for group information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17-Tue
 *
 */


module.exports = GroupHandler;


var request = require('request');

function GroupHandler(){
	/*
	 * Selects one peson's all joined groups.
	 *
	 * @param {string} username
	 * @callback {Function} operation of return results.
	 * @api public
	 *
	 */

	this.get_scopes = function(username, callback){
		var host = 'http://127.0.0.1:8000';
		var url = '/relation/invole/' + username + '/';

		request(host+url,  function(error, response, body){
			if(!error && response.statusCode == 200){
				var jsonObj = JSON.parse(body);
				var scopes_list = jsonObj.id;
				console.log(scopes_list);
				callback(scopes_list);
			}
		});
	};
}


