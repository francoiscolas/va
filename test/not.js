var ASSERT = require('assert');
var VOWS   = require('vows');
var va     = require('../va');

VOWS.describe('va(arguments, "!function|!date conditions=", "function callback=")').addBatch({
    'Called': {
        topic: function () {
            return function (s, options) {
                return va(arguments, '!function|!date conditions=', 'function callback=');
            }
        },
        'with `"bouh"` and `console.log`': {
            topic: function (func) { return func('bouh', console.log); },
            'should return {conditions: "bouh", callback: console.log}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'conditions');
                ASSERT.include(topic, 'callback');
                ASSERT.strictEqual(topic.conditions, 'bouh');
                ASSERT.strictEqual(topic.callback, console.log);
            }
        },
        'with `console.log` and `console.error`': {
            topic: function (func) { return func(console.log, console.error); },
            'should return {conditions: undefined, callback: console.log}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'conditions');
                ASSERT.include(topic, 'callback');
                ASSERT.strictEqual(topic.conditions, undefined);
                ASSERT.strictEqual(topic.callback, console.log);
            }
        },
        'with `new Date()` and `console.log`': {
            topic: function (func) { return func(new Date(), console.error); },
            'should return {conditions: undefined, callback: undefined}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'conditions');
                ASSERT.include(topic, 'callback');
                ASSERT.strictEqual(topic.conditions, undefined);
                ASSERT.strictEqual(topic.callback, undefined);
            }
        }
    }
}).export(module);
