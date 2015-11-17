/*
 * CRUD for Mysql.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 */

module.exports = Mysql;

var Q = require('q');

function Mysql(){
    var mysql = require('mysql');
    var mapper = require('./mapper/messages.js');
    mapper = new mapper();

    var configuration = require('./conf/message_conf.js'),
        c = new configuration();

    var Status = require('./status.js'),
        s = new Status();

    var connection = mysql.createConnection({
        host:   c.IP,
        user:   c.USER,
        password: c.PASSWORD,
        database: c.DATABASE
    });


    connection.connect();

    this.user_login = function(username, socket_id){
        /*
         * insert a user into login user table.
         *
         * first check if exist this user in login user table.
         * if in users table, change his status and socket, socket_id, if not, add a new user.
         */

        var restriction = {
            name: username
        };

        var query = connection.query(mapper.check_user_exist, restriction, function(err, results){
            if(err) throw err;
            var person = results[0];

            var post = {
                status: s.LOGIN,
                socket_id: socket_id
            };

            var restriction = {
                name: username
            };

            if(person){
                var query = connection.query(
                    mapper.set_user_login, 
                    [post, restriction],
                    function(err, results){
                        console.log(query.sql);
                        if(err) throw err;
                    });
            }else{
                add_a_user(username, socket_id);
            }
        });
    };

    var add_a_user = function(username, socket_id){
        /*
         * create a new user in user table.
         *
         */
        var post = {
            name: username,
            socket_id: socket_id,
            login_time: new Date(),
            status: s.LOGIN
        };
        var query = connection.query(mapper.add_a_login_user, post, function(err, result){
            if(err) throw err;
            console.log('add a user');
        });
    };


	/*
	 * Inserts data into db, and set 
	 * record status to 'Unread';
	 * @param {string} sender
	 * @param {string} receiver
	 * @param {string} message
	 * @param {string} event
	 * @param {string} unique_code
	 * @api public
	 */
	this.insert = function(sender, receiver, message, event, unique_code){
		var post = {
			message : message,
			status : s.UNREAD,
			sender : sender,
			receiver : receiver,
			event: event,
			create_date: new Date(),
			unique_code: unique_code
		};

		var query = connection.query(mapper.insert, post, function(err, result){
			if(err) throw err;
		});

		console.log(query.sql);
	};

	/*
	 * Saves group message.
	 * @param {string} sender
	 * @param {string} message: message data
	 * @param {string} unique_code: message's unique code
	 * @param {string} group: from with group name
	 * @api public
	 *
	 */
	this.save_group_message = function(sender, message, unique_code, group){
		console.log(Number(unique_code));
		var post = {
			sender: sender,
			message: message,
			unique_code: unique_code,
			group: group,
			create_date: new Date(),
		};

		var query = connection.query(mapper.save_group_message, post, function(err, result){
			if(err) throw err;
		});
	};


	/*
	 * Gets the earliset record from db.
	 * 
	 *
	 * @param {int} get messages each time
	 * @param {Function} callback function of query results
	 * @api public
	 * 
	 */

	this.get_earliest = function(number, callback){
		var query = connection.query(mapper.get_earliest, number, function(err, results){
			console.log(query.sql);
			if(err){
				throw err;
			}
			else{
				console.log('results...');
				console.log(results);
				for(var i = 0; i < results.length; i++){
					set_message_to_wait(results[i].id);
				}
				callback(results);
			}
		});
	};

	var set_message_to_wait = function(id){
		var post = {
			status: s.WAIT
		};

		var restriction = {
			id:id
		};

		var query = connection.query(mapper.update_message, [post, restriction], function(err, results){
			if(err) throw err;
		});
	};

	/*
	 * Changes the js Date() to mysql timedata type;
	 *
	 * @param {Date} need to convert
	 * @return {string} mysql formatted time data
	 */
	var convert_date = function(date){
		var result = date().toISOString().slice(0, 19).replace('T', ' ');

	};


	this.set_message_to_read = function(unique_code){
		this.check_code_message_exist(unique_code, function(unique_code){
			var post = {
				status: s.READ,
				read_date: new Date()
			};

			var restriction = {
				unique_code: unique_code
			};

			var query = connection.query(mapper.update_message, [post, restriction], function(err, results){});
		});
	};

	this.check_code_message_exist = function(unique_code, callback){
		var check_exist = "select * from message where unique_code = '"+ unique_code +"'";
		var check = connection.query(check_exist, function(err, results){
			if(err){
				console.log(check.sql);
				throw err;
			}else{
				if(!results){
					this.check_code_message_exist(unique_code, callback);
				}else{
					console.log('check success');
					console.log(results);
					callback(unique_code);
				}
			}
		});
	};

	this.old_set_message_to_read = function(unique_code){
		/*
		 *  sets the status to 'read' record which id equals id.
		 */

		var post = {
			status: s.READ,
			read_date: new Date()
		};

		var restriction = {
			unique_code: unique_code
		};

		var query = connection.query(mapper.update_message, [post, restriction], function(err, results){
			if(err){
				console.log(query.sql);
				throw err;
			}else{
				console.log('update success');
				console.log(query.sql);
			}
		});
	};

	this.get_user_socket = function(username, callback){
		var restriction = {
			name: username,
		};

		var query = connection.query(mapper.get_user_socket, restriction, function(err, results){
			if(err) throw err;
			if(results){
				var socket = results[0];
				callback(socket);
			}
		});
	};

	this.get_user_status = function(username, callback){

		var restriction = {
			name: username
		};

		var query = connection.query(mapper.get_user_status, restriction, function(err, results){
			if(err) throw err;
			if(results){
				var status = results[0];
				callback(status);
			}
		});
	};


	this.set_user_off_line = function(username){
		var post = {
			status: s.LOGOUT,
			leave_time: new Date(),
		};

		var restriction = {
			name: username
		};

		var query = connection.query(mapper.set_user_off_line, [post, restriction], function(err, results){
			if(err){
				console.log(query.sql);
				throw err;
			}else{
				console.log('logout');
			}
		});
	};

	this.set_user_break_line = function(socket_id){
		var post = {
			status: s.BREAK_LINE,
			leave_time: new Date()
		};

		var restriction = {
			socket_id: socket_id,
		};

		var query = connection.query(mapper.set_user_break_line, [post, restriction], function(err, results){
			if(err){
				throw err;
			}else{
				//            console.log(results);
			}
		});
	};

	this.set_all_users_break_line = function(){
		var post = {
			status: s.BREAK_LINE,
			leave_time: new Date()
		};

		var restriction = {
			status: s.LOGIN
		};

		var query = connection.query(mapper.set_all_users_break_line, [post, restriction], function(err, results){
			if(err){
				console.log(query.sql);
				throw err;
			}
		});
	};

	/*
	 * Gets one user's offline messages from db
	 * 
	 * In the beginning, we get all the message once a time, but if a person has too many messages, we could catch a patch and a patch. to reduce boardwidth and decrease waiting time.
	 *
	 * @param {string} username
	 * @return {list} results list
	 *
	 */

	this.get_offline_messages = function(username, callback){
		var restriction = {
			receiver: username
		};

		var query = connection.query(mapper.get_off_line_messages, restriction, function(err, results){
			if(err){
				console.log(query.sql);
				throw err;
			}else{
				console.log(query.sql);
				callback(results);
			}
		});
	};

	/*
	 * Gets one user's unread group messages from a group by his last read group message code.
	 *
	 * @param {string} username
	 * @param {string} last group message code
	 * @callback {callback} produce of result messages
	 * @api public
	 */

	this.get_group_offline_messages = function(group, lastcode, callback){
		connection.query({
			sql: mapper.get_group_offlines,
			values:[lastcode, group]
		}, function(error, results){
			if(error) throw error;
			else{
				console.log(this.sql);
				console.log(results);
				callback(results);
			}
		});
	};

}


function print(message){
	console.log(message);
}


function main(){
	var mySql = new Mysql();
	var message = {message: "message",
		from: 'new_from',
		to: 'to',
	};

	var username = '18857453090',
		socket_id = 'socket123923klsfkl';

		//mySql.get_ealiest(print);
		//mySql.user_login(username, socket_id);

		//mySql.set_user_off_line(username);
		//var test_socket_id = 'socket';
		//mySql.set_user_break_line(test_socket_id);
		//mySql.get_earliest(10, function(results){
		//console.log(results);
		//});

		//mySql.set_all_users_break_line();

		/*
		   mySql.get_offline_messages('right', function(results){
		   console.log(results);
		   });
		   */
		//	mySql.set_message_to_read('1447322076203.1594');

		//this.save_group_message = function(sender, message, unique_code, group){

		//mySql.save_group_message('sender003', 'message', '123897934123', 'group');
		mySql.get_group_offlines('group', '123898000');
}


if( require.main == module){
	main();
}
