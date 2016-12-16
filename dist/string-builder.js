(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.StringBuilder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = StringBuilder;

function StringBuilder() {
    this.buffer = [];
    this.prefixes = [];
    this.suffixes = [];
}

StringBuilder.prototype.cat = function () {
    var buffer = this.buffer;
    var cat = this.cat;
    var that = this;

    concatPrefixes(this.prefixes);
    concat.apply(undefined, arguments);
    concatSuffixes(this.suffixes);
    return this;

    function concat() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var length = args.length;
        for (var i = 0; i < length; i++) {
            var element = args[i];

            if (Array.isArray(element)) {
                concat.apply(undefined, _toConsumableArray(element));
            } else if (typeof element === 'function') {
                concat(element.call(that));
            } else {
                buffer.push(element);
            }
        }
    }

    function concatPrefixes() {
        var prefixes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var length = prefixes.length;
        for (var i = 0; i < length; i++) {
            var prefix = prefixes[i];
            if (prefix === false) {
                break;
            }
            concat.call({ buffer: buffer }, prefix);
        }
    }

    function concatSuffixes() {
        var suffixes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        for (var i = suffixes.length - 1; i >= 0; i--) {
            var suffix = suffixes[i];
            if (suffix === false) {
                break;
            }
            concat.call({ buffer: buffer }, suffix);
        }
    }
};

StringBuilder.prototype.string = function () {
    return this.buffer.join('');
};

StringBuilder.prototype.rep = function () {
    var buffer = this.buffer;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    var howManyTimes = args.pop();

    if (typeof howManyTimes !== 'number') {
        throw new TypeError('Expected a number');
    }

    for (var i = 0; i < howManyTimes; i++) {
        this.cat(args);
    }

    return this;
};

StringBuilder.prototype.catIf = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    var flag = args.pop();

    if (flag) {
        this.cat(args);
    }

    return this;
};

StringBuilder.prototype.wrap = function (prefix, suffix) {
    this.prefixes.unshift(prefix);
    this.suffixes.push(suffix);

    return this;
};

StringBuilder.prototype.prefix = function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    this.prefixes.unshift(args);
    this.suffixes.push(null);

    return this;
};

StringBuilder.prototype.suffix = function () {
    this.prefixes.unshift(null);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    this.suffixes.push(args);

    return this;
};

StringBuilder.prototype.end = function () {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    for (var i = 0; i < deep; i++) {
        this.prefixes.shift();
        this.suffixes.pop();
    }

    return this;
};

StringBuilder.prototype.each = function (collection, callback) {
    collection.forEach(callback, this);

    return this;
};

StringBuilder.prototype.suspend = function () {
    this.prefixes.unshift(false);
    this.suffixes.push(false);

    return this;
};

StringBuilder.prototype.when = function (expression, thenArgs, otherwiseArgs) {
    var result = typeof expression === 'function' ? expression.call(this) : expression;

    return this.cat(expression ? thenArgs : otherwiseArgs);
};

},{}]},{},[1])(1)
});