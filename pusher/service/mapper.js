/*
 * define the data manipulate sentences.
 * 
 * Author: Minchiuan Gao <minchian.gao@gmail.com>
 * Date: 2015-Noc-2
 *
 */

module.exports = Mapper

var status = require('./Configuration.js');
var c = new status();

function Mapper(){
    this.insert = "INSERT INTO message SET ?";
    this.select_eariliest = "select * from message.message where status = 'U' ORDER BY create_date LIMIT 1";
    this.set_to_read = "update message set status = '" + c.read + "' where id = ?";
}
