var Connection = require('./connection');

module.exports = function (url) {
    return new Connection(url);
};