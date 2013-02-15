var ASSERT = require('assert');
var VOWS   = require('vows');
var va     = require('../va');

VOWS.describe('va(arguments, "array|object body=", "number statusCode=")').addBatch({
    'Called': {
        topic: function () {
            return function (key, value, options) {
                return va(arguments, 'array|object body=', 'number statusCode=');
            }
        },
        'with {error: "Not found"} and 404': {
            topic: function (func) { return func({error: "Not found"}, 404); },
            'should return {body: {error: "Not found"}, statusCode: 404}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'body');
                ASSERT.include(topic, 'statusCode');
                ASSERT.deepEqual(topic.body, {error: "Not found"});
                ASSERT.strictEqual(topic.statusCode, 404);
            }
        },
        'with [1,2,4,8] and 404': {
            topic: function (func) { return func([1,2,4,8], 404); },
            'should return {body: [1,2,4,8], statusCode: 404}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'body');
                ASSERT.include(topic, 'statusCode');
                ASSERT.deepEqual(topic.body, [1,2,4,8]);
                ASSERT.strictEqual(topic.statusCode, 404);
            }
        },
        'with {error: "Not found"}': {
            topic: function (func) { return func({error: "Not found"}); },
            'should return {body: {error: "Not found"}}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'body');
                ASSERT.include(topic, 'statusCode');
                ASSERT.deepEqual(topic.body, {error: "Not found"});
                ASSERT.strictEqual(topic.statusCode, undefined);
            }
        },
        'with 404': {
            topic: function (func) { return func(404); },
            'should return {body: undefined, statusCode: 404}': function (topic) {
                ASSERT.isObject(topic);
                ASSERT.include(topic, 'body');
                ASSERT.include(topic, 'statusCode');
                ASSERT.strictEqual(topic.body, undefined);
                ASSERT.strictEqual(topic.statusCode, 404);
            }
        }
    }
}).export(module);
