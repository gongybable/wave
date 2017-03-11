'use strict';

var fs              = require('fs'),
    validator       = require('./validator'),
    Promise         = require('bluebird'),
    promiseFileRead = Promise.promisify(fs.read),
    promiseFileOpen = Promise.promisify(fs.open),
    promiseFileStat = Promise.promisify(fs.stat);

// read one char from the file a time at the given location
function readPreviousChar(fd, size, count) {
    if (count >= size) {
        validator.validate({code: 'INVALID_VALUE', message: 'File data invalid'});
    }
    var buf = new Buffer(1);
    return promiseFileRead(fd, buf, 0, 1, size - count).then(function () {
        return String.fromCharCode(buf[0]);
    });
}

// recursive function to read from the last char until reaches a new line
function readTilNewLine(fd, size, count, chars) {
    count++;
    return readPreviousChar(fd, size, count).then(function (newChar) {
        // read the last non-empty line and return the value
        if (newChar === '\n' && count !== 1) {
            return chars;
        }
        chars = newChar + chars;
        return readTilNewLine(fd, size, count, chars);
    });
}

module.exports = {
    // read the last line of the file
    promiseReadLastLine: function promiseReadLastLine(filePath) {
        var size,
            chars = '',
            count = 0;

        return promiseFileStat(filePath).then(function (stat) {
            size = stat.size;
            return promiseFileOpen(filePath, 'r');
        }).then(function (fd) {
            return readTilNewLine(fd, size, count, chars);
        });
    }
};