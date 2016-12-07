module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    concat(...arguments);
    return this;

    function concat(...args) {
        let length = args.length;
        for(let i=0; i<length; i++) {
            let element = args[i];

            if(Array.isArray(element)) {
                concat(...element);
            } else if(typeof element === 'function') {
                concat(element());
            } else {
                buffer.push(element);
            }
        }
    }
};

StringBuilder.prototype.string = function() {
    return this.buffer.join('');
};