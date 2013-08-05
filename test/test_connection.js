var assert = require('assert');
var nock = require('nock');
var queued = require('../lib/index');

describe('Connection', function () {
    beforeEach(function (done) {
        this.url = 'http://localhost:5353';
        this.client = queued(this.url, { auth: 'foobar' });

        var auth = new Buffer(':foobar', 'ascii').toString('base64');

        this.req = nock(this.url)
            .get('/testing')
            .matchHeader('Authorization', 'Basic ' + auth)
            .reply(200);

        this.client.exec({ method: 'GET', path: '/testing' }, done);
    });

    it('sends basic auth header', function () {
        this.req.done();
    });
});