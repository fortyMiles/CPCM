/*
 * db handler for group information.
 *
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-17-Tue
 *
 */


module.exports = GroupHandler;


var mysql = require('mysql');
var GroupMapper = require('./mapper/group.js'),
	mapper = new GroupMapper();

var Conf = require('./conf/group_conf.js'),
	c = new Conf();

function GroupHandler(){
	var connection = mysql.createConnection({
        host:   c.IP,
        user:   c.USER,
        password: c.PASSWORD,
        database: c.DATABASE
    });

	/*
	 * Selects one peson's all joined groups.
	 *
	 * @param {string} username
	 * @callback {Function} operation of return results.
	 * @api public
	 *
	 */

	this.get_groups = function(username, callback){
		var restriction = {
			user: username
		};
		var query = connection.query(mapper.select_all_joined_groups, restriction, function(err, results){
			console.log(query.sql);
			if(err){
				throw err;
			}
			callback(results);
		});
	};
}


