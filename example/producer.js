var queued = require('../lib/index');

var client = queued('http://localhost:5353');
var queue = client.queue('testing');

setInterval(function () {
    var value = new Date().toString();
    console.log(value);
    
    queue.enqueue(value, function (err) {
        if (err) throw err;
    });
}, 2000);