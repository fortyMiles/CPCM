/*
 * A mongo db class.
 * Could do CRUD method.
 * 
 * Author: Minchiuan Gao <minchiuan.gao@gmail.com>
 * Date: 2015-Oct-30
 */

var mongodb = require('mongodb');
var mongo_client = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/puser';

var test_db = null;

function connect_db(callback){
    mongo_client.connect(url, function(err, db){
        if(err==null){
            test_db = db;
            callback(null);
        }
    });
}

function close_db(){
    test_db.close();
}

connect_db(close_db());
