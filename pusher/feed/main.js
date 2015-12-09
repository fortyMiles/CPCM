/*
 * Handle the feed event.
 *
 * @author Minchiuan Gao<minchiuan.gao@gmail.com>
 * @Date: 2015-Dec-04
 *
 */

/*
 * Module Exports
 *
 */

module.exports = Feed;

var MessageService = require('./service.js');


/*
 * Super class.
 *
 */
var P2G = require('../person_to_group/main.js');

function Feed(){
}

Feed.prototype = new P2G();


var feed = new Feed();
