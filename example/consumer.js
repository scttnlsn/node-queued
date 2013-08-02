var queued = require('../lib/index');

var client = queued('http://localhost:5353');
var queue = client.queue('testing');

(function poll() {
    queue.dequeue({ timeout: 3, wait: 5 }, function (err, item) {
        if (err) throw err;
        if (!item) return poll();

        if (Math.random() > 0.25) {
            // Completed
            item.complete(function (err) {
                if (err) throw err;

                console.log('Completed:', item.value);

                poll();
            });
        } else {
            // Simulated failure
            console.log('Failed:', item.value)
            poll();
        }
    });
})();