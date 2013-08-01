var assert = require('assert');
var queued = require('../lib/index');
var server = require('./server');

describe('Queue', function () {
    beforeEach(function () {
        this.client = queued('http://localhost:5353');
        this.queue = this.client.queue('testing');
    });

    describe('#enqueue', function () {
        beforeEach(function (done) {
            var self = this;

            this.queue.enqueue('foo', function (err, item) {
                if (err) return done(err);

                self.item = item;
                done();
            });
        });

        it('POSTs data to queue', function () {
            server.enqueue.done();
        });

        it('returns item', function () {
            assert.ok(this.item);
            assert.equal(this.item.url, 'http://localhost:5353/testing/1');
            assert.equal(this.item.value, 'foo');
        });
    });
});