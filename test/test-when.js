var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #when', function() {
    it('Iterate over collection', function(){
        var sb = new StringBuilder();
        var expected = '<p>pedro is male</p>\n<p>leticia is female</p>\n<p>pablo is male</p>\n';

        sb.suffix('\n')
            .wrap('<p>', '</p>')
            .each(fixtures.peopleWithGender, function(person) {
                this.when(person.sex == 'm', () => { return person.name + ' is male' }, [ person.name,' is female' ]);
            });

        assert.equal(expected, sb.string());
   });
});