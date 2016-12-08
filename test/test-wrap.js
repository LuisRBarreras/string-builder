var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #wrap', function() {
   it('Should wrap list item values', function(){
       var sb = new StringBuilder();
       var expected = "<ul>\n<li>list item</li>\n<li>list item</li>\n</ul>";
       
       sb.cat('<ul>', '\n')
            .wrap('<li>', ['</li>' ,'\n'])
            .rep('list item', 2)
            .end()
            .cat('</ul>');

       assert.equal(expected, sb.string());     
   })

   it('Wrap should execute function nested', function() {
       var sb = new StringBuilder();
       var expected = "<ul>\n<li>1.- list item</li>\n<li>2.- list item</li>\n</ul>";
       sb.cat('<ul>\n')
            .wrap(['<li>', function() {
                var count = 0;
                return function() {
                    return count += 1;
                }
            }(), '.- '], '</li>\n')
            .rep('list item', 2)
            .end()
            .cat('</ul>')

            assert.equal(expected, sb.string());
   });
});