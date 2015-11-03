/*
 * Handle the http operation.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-3
 */

module.exports = HttpService;
function HttpService(){
    var request = require('request');
    var django_host = 'http://127.0.0.1:8000';

    this.ensure_relation = function(sender, receiver, relation, nickname){
        var url = host + '/account/relation/';

        var form_data  = {
            user1: sender,
            user2: receiver,
            relation: relation,
            nickname: nickname
        };

        request.post({url:url, form: form_data}, function(err,httpResponse,body){
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('send successful!  Server responded with:', body);
        });
    };
}
