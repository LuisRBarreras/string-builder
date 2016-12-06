module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    concat(...arguments);
    
    function concat(a, ...rest) {
        if(Array.isArray(a)) { 
            concat(...a);
        } else if(typeof a === 'function') {
            concat(a());
        } else {
            buffer.push(a);
        }

        if(rest.length > 0) {
            concat(rest);
        }
    }    
    return this;
};

return StringBuilder;
