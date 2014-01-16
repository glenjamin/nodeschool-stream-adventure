var tr = require('trumpet')();
var through = require('through');

var loud = tr.createStream('.loud');

loud.pipe(through(function (chunk) {
    this.queue(chunk.toString().toUpperCase());
})).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);
