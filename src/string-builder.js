module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
    this.prefixes = [];
    this.suffixes = [];
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    var cat = this.cat;
    var that = this;

    concatPrefixes(this.prefixes);
    concat(...arguments);
    concatSuffixes(this.suffixes);
    return this;

    function concat(...args) {
        let length = args.length;
        for (let i=0; i<length; i++) {
            let element = args[i];

            if (Array.isArray(element)) {
                concat(...element);
            } else if (typeof element === 'function') {
                concat(element.call(that));
            } else {
                buffer.push(element);
            }
        }
    }

    function concatPrefixes(prefixes=[]) {
        var length = prefixes.length;
        for (let i =0; i < length; i++) {
            let prefix = prefixes[i];
            if (prefix === false) {
                break;
            } 
            concat.call({ buffer : buffer}, prefix);
        }
    }

    function concatSuffixes(suffixes=[]) {
        for (let i = suffixes.length - 1; i >= 0; i--) {
            let suffix = suffixes[i];
            if (suffix === false) {
                break;
            }
            concat.call({ buffer: buffer}, suffix);
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
    this.prefixes.unshift(prefix);
    this.suffixes.push(suffix);
    
    return this;        
};

StringBuilder.prototype.prefix = function(...args) {
    this.prefixes.unshift(args);
    this.suffixes.push(null);

    return this;
};

StringBuilder.prototype.suffix = function(...args) {
    this.prefixes.unshift(null);
    this.suffixes.push(args);

    return this;
};

StringBuilder.prototype.end = function(deep=1) {
    for (let i=0; i < deep; i++) {
        this.prefixes.shift();
        this.suffixes.pop();
    }        
    
    return this;    
};

StringBuilder.prototype.each = function(collection, callback) {
    collection.forEach(callback, this);

    return this;
};

StringBuilder.prototype.suspend = function() {
    this.prefixes.unshift(false);
    this.suffixes.push(false);
    
    return this;
};

StringBuilder.prototype.when = function(expression, thenArgs, otherwiseArgs) {
    var result = typeof expression === 'function' ? expression.call(this) : expression;

    return this.cat(expression ? thenArgs : otherwiseArgs);
};