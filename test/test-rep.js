var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #rep', function() {
    it('Should add twice the paramaters', function() {
        var sb = new StringBuilder();

        sb.rep('hello','world', 2);

        assert.equal(sb.string(), fixtures.twiceElements.join(''));
    });

    it('Should add parameters n times and using chaining patters', function() {
        var sb = new StringBuilder();

        sb.cat('Can I go,')
            .rep('please ', 2)
            .rep('?',3)

        assert.equal(sb.string(), 'Can I go,please please ???');
    });

    it('Should add parameters n times with arrays and functions', function() {
        var sb = new StringBuilder();

        sb.cat('Can I go,')
            .rep(['please '], 2)
            .rep('?',3)
            .rep(()=> [' Thanks'], 1)

        assert.equal(sb.string(), 'Can I go,please please ??? Thanks');
    });

    it('Should throw error for howManyTimes not a number', function() {
        var sb = new StringBuilder();
        
        assert.throws(() => sb.rep('error'), TypeError);
    });
});