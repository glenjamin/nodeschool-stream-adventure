var through = require('through');
var duplex = require('duplexer');

module.exports = function(counter) {
    var counts = {};
    var input = through(function(data) {
        counts[data.country] = (counts[data.country] || 0) + 1;
    }, function end() {
        counter.setCounts(counts);
    });
    return duplex(input, counter);
};
