/*
 * Handler of the data manipualate.
 *
 * @author: Minchiuan Gao <minchuian.gao@gmail.com>
 * @date: 2015-Dec-9
 *
 */

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var url = 'mongodb://localhost/maili';
mongoose.connect(url);

var Feed = require('./model.js').Feed;

var new_feed = mongoose.model({sender: 'sender'}, Feed);

console.log(new_feed.name);
