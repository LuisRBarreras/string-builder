var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #cat', function() {
    it('Should concatenate all the parameters', function() {
        var sb = new StringBuilder();

        sb.cat('Hello', 'CAT');
        
        assert.deepEqual(sb.string(), fixtures.bufferOne.join(''));
    });
    it('Should concatenate parameters with arrays and functions', function() {
        var sb = new StringBuilder();

        sb.cat(['one', 'two'])
            .cat(() => 'three')
            .cat(['four', () => 'five']);

        assert.deepEqual(sb.string(), fixtures.numbers.join(''));
    });
});