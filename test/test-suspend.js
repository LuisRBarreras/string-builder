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
                .end(2)
                .cat('row')
        assert.equal(expected, sb.string());
   });

   it('Nested with suspend', function() {
       var sb = new StringBuilder();
       var expected = "<body>\n"+
"<section> <h1>section-1</h1><p>first paragraph</p><p>second paragraph</p></section>\n"+
"<section> <h1>section-2</h1><p>first paragraph</p><p>second paragraph</p></section>\n"+
"<section> <h1>section-3</h1><p>first paragraph</p><p>second paragraph</p></section>\n"+
"</body>\n";
        sb.suffix('\n')
            .cat('<body>')
            .prefix(' ')
            .wrap('<section>', '</section>')
            .each(fixtures.sections, function(section, index){
                this
                    .cat('<h1>', section, '</h1>',

                function(){
                        this
                            .suspend()
                            .wrap('<p>', '</p>')
                            .cat('first paragraph')
                            .cat('second paragraph')
                            .end(2);
                    })	
            })
            .end(2)
            .cat('</body>')


        assert.equal(expected, sb.string());
   })
});

