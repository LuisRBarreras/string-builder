module.exports = StringBuilder;

function StringBuilder(){
    this.buffer = [];
    this._prefix = null;
    this._suffix = null;
    this.decorators = [];
}

StringBuilder.prototype.cat = function(){
    var buffer = this.buffer;
    var _prefix = this._prefix;
    var _suffix = this._suffix;
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
                if (_prefix) {
                    cat.call({ buffer: buffer }, _prefix);
                }

                buffer.push(element);

                if (_suffix) {
                    cat.call({ buffer: buffer }, _suffix);
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
        this._prefix = prefix;
    }

    if (suffix) {
        this._suffix = suffix;
    }

    return this;        
};

StringBuilder.prototype.prefix = function(...args) {
    this.decorators.push('prefix');
    this._prefix = args;

    return this;
};

StringBuilder.prototype.suffix = function(...args) {
    this.decorators.push('suffix');
    this._suffix = args;

    return this;
};

StringBuilder.prototype.end = function(deep) {
    if (deep) {
        for (let i=0; i < deep && this.decorators.length > 0; i++) {
            let aux = this.decorators.pop();
             _cleanDecorators.call(this, aux);
        }        
    } else {
        this.decorators = [];
        this._prefix = null;
        this._suffix = null;
    }    

    return this;

    function _cleanDecorators(element) {
        if (element === 'wrap') {
            this._prefix = null;
            this._suffix = null;
        } else if (element === 'prefix') {
            this._prefix = null;
        } else if (element === 'suffix') {
            this._suffix = null;
        }
    }    
};

