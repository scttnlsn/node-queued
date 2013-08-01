var assert = require('assert');
var nock = require('nock');
var Item = require('../lib/item');
var helper = require('./helper');

describe('Item', function () {
    beforeEach(function () {
        this.item = new Item(this.url + '/testing/1', 'foo');
    });

    describe('#complete', function () {
        beforeEach(function (done) {
            var self = this;

            this.req = nock(this.url)
                .delete('/testing/1')
                .reply(204, '');

            this.item.complete(done);
        });

        it('DELETEs item from queue', function () {
            this.req.done();
        });
    });
});