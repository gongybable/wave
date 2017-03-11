'use strict';

var assert = require('chai').assert,
    path = require('path'),
    lastline_reader = require('../../lib/lastline-reader.js'),
    ONE_LINE = 'one_line.csv',
    SAMPLE = 'sample.csv',
    LASTLINE = 'report id,43,,';

describe('Unit Test for lastline-reader', function () {

    it('should fail when the file is only one line', function (done) {
        var dir = path.join(__dirname, ONE_LINE),
            validateErr = {code: 'INVALID_VALUE', message: 'File data invalid'};
        lastline_reader.promiseReadLastLine(dir).catch(function(err){
            assert.deepEqual(err.validation, validateErr);
        });
        done();
    });

    it('should success and read last line', function (done) {
        var dir = path.join(__dirname, SAMPLE);

        lastline_reader.promiseReadLastLine(dir).then(function(data){
            assert.deepEqual(data, LASTLINE);
        });
        done();
    });

});
