var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #suspend', function() {
    it('Iterate over collection', function(){
        var sb = new StringBuilder();
        var sections = ['section-1', 'section-2', 'section-3'];
        var expected = '<row>section-1 section-2 section-3 <row>';

            sb.wrap('<', '>')
                .cat('row')
                .suspend()
                .each(sections, function(section, index){
                    this.cat(section, ' ')
                                
                })
                .suffix('\n')
                .end(1)
                .cat('row')
        assert.equal(expected, sb.string());
   });
});

