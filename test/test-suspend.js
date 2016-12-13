var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #suspend', function() {
    it('Suspend wrap', function(){
        var sb = new StringBuilder();
        var expected = '<row>section-1 section-2 section-3 <row>';

            sb.wrap('<', '>')
                .cat('row')
                .suspend()
                .each(fixtures.sections, function(section, index){
                    this.cat(section, ' ')
                                
                })
                .suffix('\n')
                .end(1)
                .cat('row')
        assert.equal(expected, sb.string());
   });
});

