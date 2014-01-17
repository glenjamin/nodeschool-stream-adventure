var crypto = require('crypto');
var zlib = require('zlib');

var tar = require('tar');
var concat = require('concat-stream');

var decrypt = crypto.createDecipher(process.argv[2], process.argv[3]);

var tarparser = tar.Parse();
tarparser.on('entry', function(file) {
    if (file.type != 'File') return;

    var md5 = crypto.createHash('md5', { encoding: 'hex' });
    var hash = file.pipe(md5).pipe(concat(function(data) {
        console.log(data, file.path);
    }));
});

process.stdin
    .pipe(decrypt)
    .pipe(zlib.createGunzip())
    .pipe(tarparser);
