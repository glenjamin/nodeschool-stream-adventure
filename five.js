var through = require('through');

var i = 0;
var upordown = through(function(chunk) {
    this.queue(chunk.toString()[i++ % 2 ? 'toUpperCase' : 'toLowerCase']() + "\n");
});

process.stdin
    .pipe(require('split')())
    .pipe(upordown)
    .pipe(process.stdout);
