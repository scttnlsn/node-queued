var assert = require('assert');
var nock = require('nock');
var helper = require('./helper');

describe('Queue', function () {
    describe('#enqueue', function () {
        beforeEach(function (done) {
            var self = this;

            this.req = nock(this.url)
                .post('/testing', 'foo')
                .reply(201, '', { 'Location': this.url + '/testing/1' });

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
        describe('when queue is not empty', function () {
            beforeEach(function (done) {
                var self = this;

                this.req = nock(this.url)
                    .post('/testing/dequeue?timeout=10&wait=30')
                    .reply(200, 'foo', { 'Location': this.url + '/testing/1' });

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
        
        describe('when queue is empty', function () {
            beforeEach(function (done) {
                var self = this;

                this.req = nock(this.url)
                    .post('/testing/dequeue?timeout=10&wait=30')
                    .reply(404, '');

                this.queue.dequeue({ timeout: 10, wait: 30 }, function (err, item) {
                    if (err) return done(err);

                    self.item = item;
                    done();
                });
            });

            it('POSTs to dequeue endpoint', function () {
                this.req.done();
            });

            it('returns null item', function () {
                assert.equal(this.item, null);
            });
        });
    });
});