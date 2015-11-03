/*
 * configuration file of different status of data.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-3
 *
 */

module.exports = Status;

function Status(){
    this.LOGOUT = 'off';
    this.LOGIN = 'on';
    this.BREAK_LINE = 'break';
    this.READ = 'R';
    this.UNREAD = 'U';
}
