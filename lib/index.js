var Connection = require('./connection');

module.exports = function (url, options) {
    return new Connection(url, options);
};