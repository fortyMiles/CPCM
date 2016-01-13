/*
 * Invitation service.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-11-24
 *
 */

/*
 * Module exports
 *
 */

module.exports = InvitationService;
var request = require('request');

function InvitationService(){
	// void
}

InvitationService.prototype.check_user_exist = function(username, callback){
	var length = 11;
    var url = 'http://localhost:3000/account/exist/' + username;
	request(url, function(err, response, body){
		if(!err && response.statusCode == 200){
			var result = JSON.parse(body);
			callback(result);
		}
	});
};

InvitationService.prototype.send_invitation = function(msg, username){
	console.log('**************************************');
	console.log('send invitation message to ' + username);
	console.log('**************************************');
};

