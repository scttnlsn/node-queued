var assert = require('assert');
var nock = require('nock');
var queued = require('../lib/index');

var url = 'http://localhost:5353'

describe('Queue', function () {
    beforeEach(function () {
        this.client = queued(url);
        this.queue = this.client.queue('testing');
    });

    describe('#enqueue', function () {
        beforeEach(function (done) {
            var self = this;

            this.req = nock(url)
                .post('/testing', 'foo')
                .reply(201, '', { 'Location': url + '/testing/1' });

            this.queue.enqueue('foo', function (err, item) {
                if (err) return done(err);

                self.item = item;
                done();
            });
        });

        it('POSTs data to queue', function () {
            this.req.done();
        });

        it('returns item', function () {
            assert.ok(this.item);
            assert.equal(this.item.url, 'http://localhost:5353/testing/1');
            assert.equal(this.item.value, 'foo');
        });
    });

    describe('#dequeue', function () {
        beforeEach(function (done) {
            var self = this;

            this.req = nock(url)
                .post('/testing/dequeue?timeout=10&wait=30')
                .reply(200, 'foo', { 'Location': url + '/testing/1' });

            this.queue.dequeue({ timeout: 10, wait: 30 }, function (err, item) {
                if (err) return done(err);

                self.item = item;
                done();
            });
        });

        it('POSTs to dequeue endpoint', function () {
            this.req.done();
        });

        it('returns item', function () {
            assert.ok(this.item);
            assert.equal(this.item.url, 'http://localhost:5353/testing/1');
            assert.equal(this.item.value, 'foo');
        });
    });
});