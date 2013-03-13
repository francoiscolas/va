// va v0.2.0
// https://github.com/francoiscolas/va

(function () {

    var _toString = Object.prototype.toString;

    var _types = ['array','date','function','number','object','regexp','string'];

    var va = function (vargs/*, descriptions...*/) {
        var args         = {};
        var descriptions = [];

        for (var i = 1; i < arguments.length; i++) {
            var argument = arguments[i];
            var tokens   = arguments[i].split(' ');

            descriptions.push({
                name    : tokens.pop().replace(/=$/, ''),
                optional: (argument.substr(-1) === '='),
                types   : tokens[0] && (function (array) {
                    var object = {};

                    for (var i = 0; i < array.length; ++i) {
                        if (array[i][0] === '!') {
                            for (var j = 0; j != _types.length; ++j) {
                                if (object[_types[j]] === undefined)
                                    object[_types[j]] = true;
                            }
                            object[array[i].substring(1)] = false;
                        } else {
                            object[array[i]] = true;
                        }
                    }
                    return object;
                })(tokens[0].toLowerCase().split('|'))
            });
        }
        for (var i = 0, j = 0; i < descriptions.length; i++) {
            if (descriptions[i].types === undefined
                    || (descriptions[i].types.array && _toString.call(vargs[j]) === '[object Array]')
                    || (descriptions[i].types.date && _toString.call(vargs[j]) === '[object Date]')
                    || (descriptions[i].types.number && _toString.call(vargs[j]) === '[object Number]')
                    || (descriptions[i].types.regexp && _toString.call(vargs[j]) === '[object RegExp]')
                    || (descriptions[i].types.string && _toString.call(vargs[j]) === '[object String]')
                    || (descriptions[i].types.function && _toString.call(vargs[j]) === '[object Function]')
                    || (descriptions[i].types.object && Object(vargs[j]) === vargs[j]
                            && _toString.call(vargs[j]) !== '[object Date]'
                            && _toString.call(vargs[j]) !== '[object RegExp]'
                            && _toString.call(vargs[j]) !== '[object Function]')) {
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

