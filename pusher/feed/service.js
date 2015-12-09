/*
 * Handle the feed events.
 *
 * @author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * @build time: 2015-Dec-9
 *
 */

/*
 * Super class.
 *
 */
var P2G = require('../person_to_group/main.js');

function Feed(){
}

Feed.prototype = new P2G();


var feed = new Feed();
