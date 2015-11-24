/*
 * Process invitation acception.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-24 Mon
 *
 */

/*
 * Module exports
 *
 */

module.exports = Acception;

var Service = require('./service');

function Acception(){
	//void
}

Acception.prototype.accept = function(msg){
	debugger;
    var service = new Service();
	service.update_relation(msg);
	service.set_message_to_accept(msg);
};
