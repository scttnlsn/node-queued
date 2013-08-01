var request = require('request');
var Item = require('./item');

module.exports = Queue;

function Queue(connection, name) {
    this.connection = connection;
    this.name = name;
}

Queue.prototype.enqueue = function (value, callback) {
    this.connection.exec({ path: '/' + this.name, method: 'POST' }, function (err, res) {
        if (err) return callback(err);

        var url = res.headers.location;
        var item = new Item(url, value);

        callback(null, item);
    });
};