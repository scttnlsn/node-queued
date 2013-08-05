var request = require('request');
var Queue = require('./queue');

module.exports = Connection;

function Connection(url, options) {
    options || (options = {});

    this.url = url;
    this.auth = options.auth;
}

Connection.prototype.queue = function (name) {
    return new Queue(this, name);
};

Connection.prototype.exec = function (options, callback) {
    if (options.url === undefined) {
        options.url = this.url + options.path;
    }

    if (this.auth !== undefined) {
        options.auth = { username: '', password: this.auth };
    }

    request(options, callback);
};