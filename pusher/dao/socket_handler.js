/*
 * 
 * Because the socket is a very large json data, 
 * which can not save in Mysql db, 
 * and it is also unnecessay to save socket in MysqlDB,
 *
 * So, create a dictionary that save each user's socket information.
 *
 * The Socket information is 
 *  
 *  {
 *      username: string,
 *      socket_id: string,
 *      socket: JSON
 *  }
 *  
 *  Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 *  Date: 2015-Nov-4
 *
 */

module.exports = SocketHandler;

function SocketHandler(){

    var sockets = {};

    this.get_socket_by_name = function(username){
        console.log(username);
        console.log(username in sockets);
        if(username in sockets){
            return sockets[username].socket;
        }else{
            return null;
        }
    };

    this.add_a_socket = function(username, socket){
        sockets[username] = {};
        sockets[username].socket = socket;
        console.log(username);
        console.log(username in sockets);
    };

    this.delete_a_socket = function(username){
        return delete sockets.username;
    };
}

function main(){
    var socket_handler = new SocketHandler();
    var name = '18857453090';
    socket_handler.add_a_socket(name, 'socket');
    socket_handler.delete_a_socket(name);
    console.log(socket_handler.get_socket_by_name(name));
}

if(require.main == module){
    main();
}
