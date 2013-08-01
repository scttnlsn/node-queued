var queued = require('../lib/index');

beforeEach(function () {
    this.url = 'http://localhost:5353';
    this.client = queued(this.url);
    this.queue = this.client.queue('testing');
});