function encode (o, sep) {
    var list = [];
    var key;
    for (key in o) {
        if (o[key] != null && typeof o[key] != 'object' &&
                typeof o[key] != 'function') {
            list.push(encodeURIComponent(key) + '=' + encodeURIComponent(o[key]));
        }
    }
    return list.join(sep || '&');
}

var REXP_SPLIT = /&amp;|&|;/gmi;
function decode (str, sep) {
    sep = sep||REXP_SPLIT;
    var result = {};
    var expr = str.split(sep);
    var key, val, index;
    for (var i = 0, len = expr.length; i < len; i++) {
        index = expr[i].indexOf('=');
        key = expr[i].substring(0, index);
        val = expr[i].substring(index+1);
        if (val) {
            result[decodeURIComponent(key)] = decodeURIComponent(val);
        }
    }
    return result;
};

module.exports = {
    encode: encode,
    decode: decode
};