module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
    this.decorators = [];
    
}

function Decorator(name, ...values) {
    this.name = name;
    this.values= values;

    this.execute = function(prefixes, suffixes) {
        if (this.name === 'wrap') {
                prefixes.push(this.values[0]);
                suffixes.push(this.values[1]);
            } else if (this.name === 'prefix') {
                prefixes.push(this.values);
            } else if (this.name === 'suffix') {
                suffixes.push(this.values);
            }
    }
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

        cat.call({ buffer : buffer}, prefixes.reverse());
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
    wrap = new Decorator('wrap', prefix, suffix);
    this.decorators.push(wrap);

    return this;        
};

StringBuilder.prototype.prefix = function(...args) {
    prefix = new Decorator('prefix', args);
    this.decorators.push(prefix);

    return this;
};

StringBuilder.prototype.suffix = function(...args) {
    suffix = new Decorator('suffix', args);
    this.decorators.push(suffix);

    return this;
};

StringBuilder.prototype.end = function(deep=1) {
    for (let i=0; i < deep && this.decorators.length > 0; i++) {
        this.decorators.pop();
    }        
        
    return this;    
};

