var request = require('request');
var Queue = require('./queue');

module.exports = Connection;

function Connection(url) {
    this.url = url;
}

Connection.prototype.queue = function (name) {
    return new Queue(this, name);
};

Connection.prototype.exec = function (options, callback) {
    if (options.url === undefined) {
        options.url = this.url + options.path;
    }

    request(options, callback);
};