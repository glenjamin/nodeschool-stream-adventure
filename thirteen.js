var zlib = require('zlib');

var combiner = require('stream-combiner');
var split = require('split');
var through = require('through');

function safeJSON(raw) {
    try {
        return JSON.parse(raw);
    } catch (ex) {
        return null;
    }
}

module.exports = function() {
    var genre = null;

    var json = split(safeJSON);
    json.on('error', console.warn);

    return combiner(
        json,
        through(parse, flush),
        zlib.createGzip()
    );

    function write(stream) {
        stream.queue(JSON.stringify(genre) + "\n");
    }

    function parse(data) {
        if (genre && data.type == 'genre') {
            write(this);
        }
        if (data.type == 'genre') {
            genre = {"name": data.name, "books": []};
        } else if (data.type == 'book') {
            genre.books.push(data.name);
        }
    }

    function flush() {
        write(this);
        this.queue(null);
    }
};
