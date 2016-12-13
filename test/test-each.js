var StringBuilder = require('../src/string-builder');
var assert = require('chai').assert;
var sinon = require('sinon');
var jsonfile = require('jsonfile');

var file = './fixtures/data.json';
var fixtures = jsonfile.readFileSync(file);

describe('StringBuilder #each', function() {
    it('Iterate over collection', function(){
        var sb = new StringBuilder();
        var expected = ''+
        '<table>'+
            '<thead><tr><th>Name</th><th>Age</td></thead>' +
            '<tbody>'+
                '<tr>'+
                    '<td>pedro</td>'+
                    '<td>30</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>juan</td>'+
                    '<td>15</td>'+ 
                '</tr>'+
            '</tbody>'+
        '</table>';

        

        sb.cat('<table>')
            .cat('<thead><tr><th>Name</th><th>Age</td></thead>')
            .cat('<tbody>')
            .each(fixtures.people, function(value, index, people) {
                this
                    .cat('<tr>')
                    .cat(['<td>', value.name, '</td>'])
                    .cat(['<td>', value.age, '</td>'])
                    .cat('</tr>')
            })
            .cat('</tbody>')
            .cat('</table>')
 
        assert.equal(expected, sb.string());
   });
});