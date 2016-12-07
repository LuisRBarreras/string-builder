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

    let callback = element => this.cat(element);
    for (let i=0; i < howManyTimes; i++) {
       args.forEach(callback);
    }

    return this;
};

StringBuilder.prototype.catIf = function(...args) {
    var buffer = this.buffer;
    var flag = args.pop();

    if (flag) {
        args.forEach(element => buffer.push(element));
    }

    return this;
};