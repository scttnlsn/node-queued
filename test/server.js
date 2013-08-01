var nock = require('nock');

beforeEach(function () {
    exports.enqueue = nock('http://localhost:5353')
        .post('/testing')
        .reply(201, '', { 'Location': 'http://localhost:5353/testing/1' });
});