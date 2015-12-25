/*
 * define the data manipulate sentences.
 * 
 * Author: Minchiuan Gao <minchian.gao@gmail.com>
 * Date: 2015-Noc-2
 *
 */

module.exports = Mapper;

function Mapper(){
    this.save_group_message = "INSERT INTO message.group_messages SET ?";

	this.get_group_offlines = "SELECT * FROM group_message.group_messages where `group` = ? and `unique_code` > ? ORDER BY `unique_code` ";
}
