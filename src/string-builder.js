module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
    this.prefix = null;
    this.suffix = null;
    this.decorators = [];
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    var prefix = this.prefix;
    var suffix = this.suffix;
    var cat = this.cat;

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
                if (prefix) {
                    cat.call({ buffer: buffer }, prefix);
                }

                buffer.push(element);

                if (suffix) {
                    cat.call({ buffer: buffer }, suffix);
                }
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

StringBuilder.prototype.wrap = function(prefix, suffix) {
    this.decorators.push('wrap');
    if (prefix) {
        this.prefix = prefix;
    }

    if (suffix) {
        this.suffix = suffix;
    }

    return this;        
};

StringBuilder.prototype.end = function(deep) {
    if (deep) {
        for (let i=0; i < deep && decorators.length > 0; i++) {
            let aux = this.decorators.pop();
             _cleanDecorators(aux);
        }        
    } else {
        this.decorators = [];
        this.prefix = null;
        this.suffix = null;
    }    

    return this;

    function _cleanDecorators(element) {
        if(element === 'wrap') {
            this.prefix = null;
            this.suffix = null;
        }   
    }    
};

