var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #catIf', function() {
    it('Should concatenate only when the flag is false', function() {
        var sb = new StringBuilder();
        var myMood = 'happy';

        sb.catIf('Hello ', true)
            .catIf('Everyone', myMood === 'happy')
            .catIf('Everyone', myMood === 'angry');
        
        assert.deepEqual(sb.string(), 'Hello Everyone');
    });
    
});