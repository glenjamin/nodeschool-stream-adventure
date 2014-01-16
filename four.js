var through = require('through');

var uppercaser = through(function(chunk) {
    this.queue(chunk.toString().toUpperCase());
});

process.stdin.pipe(uppercaser).pipe(process.stdout);
