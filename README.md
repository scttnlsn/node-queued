node-queued
===========

[Queued](http://github.com/scttnlsn/queued) client for Node.js

**Example**

```javascript
var queued = require('queued');
var client = queued('http://localhost:5353');
var queue = client.queue('foo');
```

Producer:

```javascript
queue.enqueue("foo", function (err, item) {
    ...
});
```

Consumer:

```javascript
queue.dequeue({ timeout: 30, wait: 30 }, function (err, item) {
    if (err) throw err;

    console.log(item.value);

    item.complete(function (err) {
        if (err) throw err;
    });
});
```