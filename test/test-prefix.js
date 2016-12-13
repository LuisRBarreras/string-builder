var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #prefix', function() {
   it('Should pre append values', function(){
       var sb = new StringBuilder();
       var expected = "##YEI##!.";
       
       sb.prefix('##')
            .cat('YEI')
            .cat(['!'])
            .end(1)
            .cat('.')
          
       assert.equal(expected, sb.string());     
   });
});