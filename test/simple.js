var ASSERT = require('assert');
var VOWS   = require('vows');
var va     = require('../va');

VOWS.describe('va(arguments, "string s", "object options=")').addBatch({
    'Called': {
        topic: function () {
            return function (s, options) {
                return va(arguments, 'string s', 'object options=');
            }
        },
        'with "bouh" and {ok: true}': {
            topic: function (func) { return func('bouh', {ok: true}); },
            'should return {s: "bouh", options: {ok: true}}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 's');
                ASSERT.include(topic, 'options');
                ASSERT.strictEqual(topic.s, 'bouh');
                ASSERT.deepEqual(topic.options, {ok: true});
            }
        },
        'with "bouh"': {
            topic: function (func) { return func('bouh'); },
            'should return {s: "bouh", options: undefined}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 's');
                ASSERT.include(topic, 'options');
                ASSERT.strictEqual(topic.s, 'bouh');
                ASSERT.strictEqual(topic.options, undefined);
            }
        },
        'without arguments': {
            topic: function (func) { return func(); },
            'should return {} (no match)': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.isEmpty(topic);
            }
        },
        'with a number': {
            topic: function (func) { return func(0); },
            'should return {} (no match)': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.isEmpty(topic);
            }
        },
        'with {ok: true}': {
            topic: function (func) { return func({ok: true}); },
            'should return {} (no match)': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.isEmpty(topic);
            }
        }
    }
}).export(module);
