/*
 * define the group manipulate sentences.
 * 
 * Author: Minchiuan Gao <minchian.gao@gmail.com>
 * Date: 2015-Noc-17 Tue
 *
 */

module.exports = Mapper;

function Mapper(){

	/*
	 * Selects a person's all joined groups.
	 */
	this.select_all_joined_groups = "select `group` from `maili-test`.user_groups where ?";

}
