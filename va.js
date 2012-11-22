(function () {

    var _toString = Object.prototype.toString;

    var va = function (vargs/*, descriptions...*/) {
        var args         = {};
        var vargs        = Array.prototype.slice.call(vargs);
        var descriptions = [];

        for (var i = 1; i < arguments.length; i++) {
            var argument = arguments[i];
            var tokens   = arguments[i].split(' ');

            descriptions.push({
                name    : tokens.pop().replace(/=$/, ''),
                type    : tokens[0] && tokens[0].toLowerCase(),
                optional: (argument.substr(-1) === '=')
            });
        }
        for (var i = 0, j = 0; i < descriptions.length; i++) {
            if (descriptions[i].type === undefined
                    || (descriptions[i].type === 'array' && _toString.call(vargs[j]) === '[object Array]')
                    || (descriptions[i].type === 'date' && _toString.call(vargs[j]) === '[object Date]')
                    || (descriptions[i].type === 'number' && _toString.call(vargs[j]) === '[object Number]')
                    || (descriptions[i].type === 'regexp' && _toString.call(vargs[j]) === '[object RegExp]')
                    || (descriptions[i].type === 'string' && _toString.call(vargs[j]) === '[object String]')
                    || (descriptions[i].type === 'function' && _toString.call(vargs[j]) === '[object Function]')
                    || (descriptions[i].type === 'object' && _toString.call(vargs[j]) !== '[object Function]' && vargs[j] === Object(vargs[j]))) {
                args[descriptions[i].name] = vargs[j++];
            } else  if (descriptions[i].optional) {
                args[descriptions[i].name] = undefined;
            } else {
                break;
            }
        }
        return args;
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = va;
    else
        this.va = va;

})();

