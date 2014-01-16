var http = require('http');

var through = require('through');

var server = http.createServer(function(req, res) {
    var uppercaser = through(function(chunk) {
        this.queue(chunk.toString().toUpperCase());
    });

    req.pipe(uppercaser).pipe(res);
});

server.listen(process.argv[2]);
