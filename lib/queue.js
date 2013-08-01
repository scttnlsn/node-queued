var request = require('request');
var Item = require('./item');

module.exports = Queue;

function Queue(connection, name) {
    this.connection = connection;
    this.name = name;
}

Queue.prototype.enqueue = function (value, callback) {
    this.connection.exec({
        method: 'POST',
        path: '/' + this.name,
        body: value
    }, function (err, res) {
        if (err) return callback(err);

        var url = res.headers.location;
        var item = new Item(url, value);

        callback(null, item);
    });
};

Queue.prototype.dequeue = function (options, callback) {
    if (callback === undefined && typeof options === 'function') {
        callback = options;
        options = {};
    }

    this.connection.exec({
        method: 'POST',
        path: '/' + this.name + '/dequeue',
        qs: options
    }, function (err, res, body) {
        if (err) return callback(err);

        var url = res.headers.location;
        var item = new Item(url, body);

        callback(null, item);
    });
}