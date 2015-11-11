/*
 * CRUD for Mysql.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Nov-2
 */

module.exports = Mysql;


function Mysql(){
    var mysql = require('mysql');
    var mapper = require('./mapper.js');
    mapper = new mapper();

    var configuration = require('./configuration.js'),
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


    this.insert = function(sender, receiver, message, event, unique_code){
        /*
         * insert data into db, and set 
         * record status to 'Unread';
         */
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



    this.get_earliest = function(number, callback){
        /*
         * get the earliset record from db.
         * 
         * parameters:
         *
         * -name: callback
         *  type: function
         *  description: callback function o result;
         */
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
		mySql.get_earliest(10, function(results){
			console.log(results);
		});

		//mySql.set_all_users_break_line();
}


if( require.main == module){
	main();
}
