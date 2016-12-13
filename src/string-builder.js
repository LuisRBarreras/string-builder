module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
    this.decorators = [];    
}

function Decorator(prefix, suffix) {
    this.prefix = prefix;
    this.suffix = suffix;

    this.execute = function(prefixes, suffixes) {
        prefixes.unshift(prefix);
        suffixes.push(suffix);
    };
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    var decorators = this.decorators;
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
            } else if (decorators && decorators.length > 0) {
                concatWithDecorators(decorators, element);
            } else {
                buffer.push(element);
            }
        }
    }

    function concatWithDecorators(decorators, element) {
        var prefixes = [];
        var suffixes = [];
        
        for (let i = decorators.length - 1; i >= 0; i--) {
            let decorator = decorators[i];
            decorator.execute(prefixes, suffixes);
        }

        cat.call({ buffer : buffer}, prefixes);
        cat.call({ buffer: buffer}, element);
        cat.call({ buffer: buffer}, suffixes); 
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
    var wrap = new Decorator(prefix, suffix);
    this.decorators.push(wrap);

    return this;        
};

StringBuilder.prototype.prefix = function(...args) {
    var prefix = new Decorator(args, null);
    this.decorators.push(prefix);

    return this;
};

StringBuilder.prototype.suffix = function(...args) {
    var suffix = new Decorator(null, args);
    this.decorators.push(suffix);

    return this;
};

StringBuilder.prototype.end = function(deep=1) {
    for (let i=0; i < deep && this.decorators.length > 0; i++) {
        this.decorators.pop();
    }        
        
    return this;    
};

StringBuilder.prototype.each = function(collection, callback) {
    collection.forEach(callback, this);

    return this;
};