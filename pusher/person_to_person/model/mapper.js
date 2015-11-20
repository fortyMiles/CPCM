/*
 * define the data manipulate sentences of p2p message.
 * 
 * Author: Minchiuan Gao <minchian.gao@gmail.com>
 * Date: 2015-Nov-19 Thu
 *
 */

module.exports = Mapper;

function Mapper(){
    this.save_a_new_message = "INSERT INTO message SET ?";

	this.get_off_line_messages = "SELECT message, sender, receiver, create_date, event, unique_code FROM message.message WHERE ? AND status = 'U' AND unique_code IS NOT NULL ORDER BY unique_code";

	this.set_message_to_read = "UPDATE message.message SET ? where ?";
}

