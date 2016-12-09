var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #suffix', function() {
   it('Should post append values', function(){
       var sb = new StringBuilder();
       var expected = "Hello\nWorld\n!#$\n...";
       
       sb.suffix('\n')
            .cat('Hello')
            .cat(['World'])
            .cat(() => ['!#$'])
            .end(1)
            .cat('...');
          
       assert.equal(expected, sb.string());     
   });
});