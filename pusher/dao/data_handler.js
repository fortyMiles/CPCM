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

    this.user_login = function(username, socket_id, socket){
        /*
         * insert a user into login user table.
         *
         * first check if exist this user in login user table.
         * if in users table, change his status and socket, socket_id, if not, add a new user.
         */
        var query = connection.query(mapper.check_user_exist, username, function(err, results){
            if(err) throw err;
            var person = results[0];
            if(person){
                var query = connection.query(
                    mapper.set_user_login, 
                    [socket_id, socket, username], 
                    function(err, results){
                        console.log(query.sql);
                        if(err) throw err;
                    });
            }else{
                add_a_user(username, socket_id, socket);
            }
        });
    };

    var add_a_user = function(username, socket_id, socket){
        /*
         * create a new user in user table.
         *
         */
        var post = {
            name: username,
            socket_id: socket_id,
            socket: socket,
            login_time: new Date(),
            status: c.LOGIN
        };
        var query = connection.query(mapper.add_a_login_user, post, function(err, result){
            if(err) throw err;
            console.log('add a user');
        });
    };


    this.insert = function(sender, receiver, message){
        /*
         * insert data into db, and set 
         * record status to 'Unread';
         */
        var post = {
            message : message,
            status : s.UNREAD,
            sender : sender,
            receiver : receiver,
            create_date: new Date()
        };

        var query = connection.query(mapper.insert, post, function(err, result){
            if(err) throw err;
        });

        console.log(query.sql);
    };



    this.get_earliest = function(callback, username){
        /*
         * get the earliset record from db.
         * 
         * parameters:
         *
         * -name: callback
         *  type: function
         *  description: callback function o result;
         *  
         * -name: username
         *  description: the unread message of user's name, if is 'all', means, get all the unread message.
         *  defalut: 'all'
         *  type: varchar();
         *  
         */

        var ALL = 'ALL';
        var execute_sql = mapper.get_earliest;
        var args= [];

        username = username || ALL;

        if(username != ALL){
            execute_sql = mapper.get_one_user_unread_messages;
            args.push(username);
        }

        var query = connection.query(execute_sql, args, function(err, results){
            console.log(query.sql);
            if(err){
                throw err;
            }
            else{
                callback(results);
            }
        });
    };


    this.update = function(data){

    };

    this.drop = function(data){
        
    };

    this.set_message_to_read = function(record_id){
        /*
         *  sets the status to 'read' record which id equals id.
         */
        connection.query(mapper.set_to_read, [record_id], function(err, results){
        if(err) throw err;
        });
    };

    this.get_user_socket = function(username, callback){
        var query = connection.query(mapper.get_user_socket, username, function(err, results){
            if(err) throw err;
            if(results){
                var socket = results[0];
                callback(socket);
            }
        });
    };

    this.get_user_status = function(username, callback){
        var query = connection.query(mapper.get_user_status, username, function(err, results){
            if(err) throw err;
            if(results){
                var status = results[0];
                callback(status);
            }
        });
    };


    this.set_user_off_line = function(username){
        var query = connection.query(mapper.set_user_off_line, username, function(err, results){
            if(err){
                console.log(query.sql);
                throw err;
            }else{
                console.log('logout');
            }
        });
    };

    this.set_user_break_line = function(socket_id){
        var query = connection.query(mapper.set_user_break_line, socket_id, function(err, results){
            if(err){
                throw err;
            }
        });
    };
}


function print(message){
    console.log(message);
}


function test(){
    var mysql = new Mysql();
    var message = {message: "message",
        from: 'new_from',
        to: 'to',
    };
    mysql.get_ealiest(print);
}

//test();
