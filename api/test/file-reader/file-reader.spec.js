'use strict';

var assert = require('chai').assert,
    path = require('path'),
    file_reader = require('../../lib/file-reader.js'),
    WRONG_DATE = 'wrong_date.csv',
    WRONG_HOUR = 'wrong_hour.csv',
    WRONG_EMPLOYEEID = 'wrong_employeeId.csv',
    WRONG_JOBGROUP = 'wrong_jobgroup.csv',
    SAMPLE = 'sample.csv',
    csvData = [
        [1, '2016-11-14', 7.5, 1, 'A'],
        [1, '2016-11-9', 4, 2, 'B'],
        [1, '2016-2-24', 5, 5, 'B']
    ],
    REPORT_ID = 1;

describe('Unit Test for file-reader', function () {

    it('should have error "File date invalid" on field "date"', function (done) {
        var dir = path.join(__dirname, WRONG_DATE),
            validateErr = {code: 'INVALID_VALUE', message: 'File data invalid for cloumn "date" at row: 2'};
        file_reader.promiseReadSream(dir, REPORT_ID).catch(function(err){
            assert.deepEqual(err.validation, validateErr);
        });
        done();
    });

    it('should have error "File date invalid" on field "hours worked"', function (done) {
        var dir = path.join(__dirname, WRONG_HOUR),
            validateErr = {code: 'INVALID_VALUE', message: 'File data invalid for cloumn "hours worked" at row: 3'};
        file_reader.promiseReadSream(dir, REPORT_ID).catch(function(err){
            assert.deepEqual(err.validation, validateErr);
        });
        done();
    });

    it('should have error "File date invalid" on field "employee id"', function (done) {
        var dir = path.join(__dirname, WRONG_EMPLOYEEID),
            validateErr = {code: 'INVALID_VALUE', message: 'File data invalid for cloumn "employee id" at row: 4'};
        file_reader.promiseReadSream(dir, REPORT_ID).catch(function(err){
            assert.deepEqual(err.validation, validateErr);
        });
        done();
    });

    it('should have error "File date invalid" on field "job group"', function (done) {
        var dir = path.join(__dirname, WRONG_JOBGROUP),
            validateErr = {code: 'INVALID_VALUE', message: 'File data invalid for cloumn "job group" at row: 4'};
        file_reader.promiseReadSream(dir, REPORT_ID).catch(function(err){
            assert.deepEqual(err.validation, validateErr);
        });
        done();
    });

    it('should success', function (done) {
        var dir = path.join(__dirname, SAMPLE);
        file_reader.promiseReadSream(dir, REPORT_ID).then(function(data){
            assert.deepEqual(data, csvData);
        });
        done();
    });

});
