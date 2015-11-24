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
    url = 'http://127.0.0.1:8000/account/exist/' + username;
	request(url, function(err, response, body){
		if(!err && response.statusCode == 200){
			var result = JSON.parse(body);
			callback(result.exist);
		}
	});
};

InvitationService.prototype.send_invitation = function(msg, usename){
			console.log('**************************************');
			console.log('send invitation message to ' + username);
			console.log('**************************************');
};

