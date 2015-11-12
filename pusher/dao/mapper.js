/*
 * define the data manipulate sentences.
 * 
 * Author: Minchiuan Gao <minchian.gao@gmail.com>
 * Date: 2015-Noc-2
 *
 */

module.exports = Mapper;

var status = require('./status.js');
var s = new status();

function Mapper(){
    this.insert = "INSERT INTO message SET ?";

    //this.get_eariliest = "select * from message.message where status = 'U' ORDER BY create_date LIMIT 1";

    this.get_earliest = "select message.id, message.sender, message.receiver, message.message, message.create_date, message.event from message JOIN login_users on message.receiver = login_users.name and message.status = '" + s.UNREAD +"' and login_users.status = '" + s.LOGIN + "' LIMIT ?";

	this.get_off_line_messages = "SELECT message, sender, receiver, create_date, event, unique_code FROM message.message WHERE ? AND status = 'U' AND unique_code IS NOT NULL ORDER BY unique_code";

    this.update_message = "update message set ? where ?";

    this.add_a_login_user = "INSERT INTO login_users SET ?";

    this.check_user_exist = 'SELECT name FROM message.login_users where ?';

    this.get_user_socket = 'SELECT socket FROM message.login_users where ? LIMIT 1';

    this.get_user_status = 'SELECT status FROM message.login_users where ? LIMIT 1';

    this.set_user_login = "UPDATE login_users SET ? where ?";

    this.set_user_off_line = "UPDATE login_users SET ? where ?";

    this.set_user_break_line = "UPDATE login_users SET ? where ?";

    this.set_all_users_break_line = 'UPDATE login_users SET ? where ?';
}
