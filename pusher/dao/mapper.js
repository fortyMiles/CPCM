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

    this.get_earliest = "select message.id, message.sender, message.receiver, message.message, message.create_date from message JOIN login_users on message.receiver = login_users.name and login_users.status = '" + s.LOGIN + "' LIMIT 2";

    this.get_one_user_unread_messages = "select message.id, message.sender, message.receiver, message.message, message.create_date from message JOIN login_users on message.receiver = login_users.name and login_users.status = '" + s.LOGIN + "' and login_users.name= ?";

    this.set_to_read = "update message set status = '" + s.READ + "' where id = ?";

    this.add_a_login_user = "INSERT INTO login_users SET ?";

    this.check_user_exist = 'SELECT name FROM message.login_users where name = ?';

    this.get_user_socket = 'SELECT socket FROM message.login_users where name= ? LIMIT 1';

    this.get_user_status = 'SELECT status FROM message.login_users where name = ? LIMIT 1';

    this.set_user_login = "UPDATE login_users SET status = '" + s.LOGIN + "', socket_id = ?, socket = ? where name = ?";

    this.set_user_off_line = "UPDATE login_users SET status = '" + s.LOGOUT + "' where name = ?";

    this.set_user_break_line = "UPDATE login_users SET status = '" + s.BREAK_LINE + "' where socket_id = ?";
}
