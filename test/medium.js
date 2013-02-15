var ASSERT = require('assert');
var VOWS   = require('vows');
var va     = require('../va');

VOWS.describe('va(arguments, "number port", "string host=", "object options=", "function callback")').addBatch({
    'Called': {
        topic: function () {
            return function (key, value, options) {
                return va(arguments, 'number port', 'string host=', 'object options=', 'function callback');
            }
        },
        'with 8080, "localhost", {ok: true} and console.log': {
            topic: function (func) { return func(8080, 'localhost', {ok: true}, console.log); },
            'should return an object with properties port, host, options and callback': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'port');
                ASSERT.include(topic, 'host');
                ASSERT.include(topic, 'options');
                ASSERT.include(topic, 'callback');
            },
            'port should be equal to 8080': function (topic) {
                ASSERT.strictEqual(topic.port, 8080);
            },
            'host should be equal to "localhost"': function (topic) {
                ASSERT.strictEqual(topic.host, 'localhost');
            },
            'options should be equal to {ok: true}': function (topic) {
                ASSERT.deepEqual(topic.options, {ok: true});
            },
            'callback should be equal to console.log': function (topic) {
                ASSERT.strictEqual(topic.callback, console.log);
            }
        },
        'with 8080, {ok: true} and console.log': {
            topic: function (func) { return func(8080, {ok: true}, console.log); },
            'should return an object with properties port, host, options and callback': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'port');
                ASSERT.include(topic, 'host');
                ASSERT.include(topic, 'options');
                ASSERT.include(topic, 'callback');
            },
            'port should be equal to 8080': function (topic) {
                ASSERT.strictEqual(topic.port, 8080);
            },
            'host should be undefined': function (topic) {
                ASSERT.strictEqual(topic.host, undefined);
            },
            'options should be equal to {ok: true}': function (topic) {
                ASSERT.deepEqual(topic.options, {ok: true});
            },
            'callback should be equal to console.log': function (topic) {
                ASSERT.strictEqual(topic.callback, console.log);
            }
        },
        'with 8080 and console.log': {
            topic: function (func) { return func(8080, console.log); },
            'should return an object with properties port, host, options and callback': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'port');
                ASSERT.include(topic, 'host');
                ASSERT.include(topic, 'options');
                ASSERT.include(topic, 'callback');
            },
            'port should be equal to 8080': function (topic) {
                ASSERT.strictEqual(topic.port, 8080);
            },
            'host should be undefined': function (topic) {
                ASSERT.strictEqual(topic.host, undefined);
            },
            'options should be undefined': function (topic) {
                ASSERT.strictEqual(topic.options, undefined);
            },
            'callback should be equal to console.log': function (topic) {
                ASSERT.strictEqual(topic.callback, console.log);
            }
        },
        'with 8080': {
            topic: function (func) { return func(8080); },
            'should return an object with properties port, host and options': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'port');
                ASSERT.include(topic, 'host');
                ASSERT.include(topic, 'options');
            },
            'port should be equal to 8080': function (topic) {
                ASSERT.strictEqual(topic.port, 8080);
            },
            'host should be undefined': function (topic) {
                ASSERT.strictEqual(topic.host, undefined);
            },
            'options should be undefined': function (topic) {
                ASSERT.strictEqual(topic.options, undefined);
            },
            'callback should not be defined': function (topic) {
                ASSERT.isFalse(topic.hasOwnProperty('callback'));
            }
        },
        'with console.log': {
            topic: function (func) { return func(console.log); },
            'should return an empty object (port is mandatory)': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.isEmpty(topic);
            }
        }
    }
}).export(module);
