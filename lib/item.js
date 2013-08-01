var request = require('request');

module.exports = Item;

function Item(url, value) {
    this.url = url;
    this.value = value;
}

Item.prototype.complete = function (callback) {
    request({
        url: this.url,
        method: 'DELETE'
    }, function (err) {
        if (err) return callback(err);
        callback();
    });
};