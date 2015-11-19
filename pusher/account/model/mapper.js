/*
 * SQL sentences for client account operations.
 *
 * @author Minchiuan Gao <minchiuan.gao@gmail.com>
 * Build Date: 2015-Nov-18 Web
 */

module.exports = Mapper;

function Mapper(){
	this.register_client = "INSERT INTO client set ?";

	this.user_exist = "select exists(SELECT * FROM client where ?)";

	this.set_user_on_line = "UPDATE client SET ? where ?";
}
