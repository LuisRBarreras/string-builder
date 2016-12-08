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
        for (let i=0; i<length; i++) {
            let element = args[i];

            if (Array.isArray(element)) {
                concat(...element);
            } else if (typeof element === 'function') {
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

StringBuilder.prototype.rep = function(...args) {
    var buffer = this.buffer;
    var howManyTimes = args.pop();

    if (typeof howManyTimes !== 'number') {
        throw new TypeError('Expected a number');
    }

    for (let i=0; i < howManyTimes; i++) {
       this.cat(args);
    }
    
    return this;
};

StringBuilder.prototype.catIf = function(...args) {
    var flag = args.pop();

    if (flag) {
        this.cat(args);
    }

    return this;
};