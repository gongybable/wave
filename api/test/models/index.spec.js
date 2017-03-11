'use strict';

var assert = require('chai').assert,
    mysql = require('../../lib/mysql'),
    payrollModel = require('../../models/index.js'),

    csvRows = [
        [1, '2016-11-14', 7.5, 1, 'A'],
        [1, '2016-11-9', 4, 2, 'B'],
        [1, '2016-11-10', 4, 2, 'B'],
        [1, '2016-11-9', 11.5, 3, 'A'],
        [1, '2016-11-8', 6, 3, 'A'],
        [1, '2016-11-11', 3, 3, 'A'],
        [1, '2016-11-2', 6, 3, 'A'],
        [1, '2016-11-3', 12, 2, 'B'],
        [1, '2016-11-4', 11, 2, 'B'],
        [1, '2016-11-6', 5, 4, 'B'],
        [1, '2016-11-21', 6, 1, 'A'],
        [1, '2016-11-22', 5, 1, 'A'],
        [1, '2016-12-14', 7.5, 1, 'A'],
        [1, '2016-12-9', 4, 2, 'B'],
        [1, '2016-12-10', 4, 2, 'B'],
        [1, '2016-12-9', 11, 3, 'A'],
        [1, '2016-12-22', 6, 3, 'A'],
        [1, '2016-12-25', 4, 2, 'B']
    ],
    reportDate = [{
        "period": "01/11/2016 - 15/11/2016",
        "employeeId": 1,
        "pay": 150
    },{
        "period": "16/11/2016 - 30/11/2016",
        "employeeId": 1,
        "pay": 220
    },{
        "period": "01/12/2016 - 15/12/2016",
        "employeeId": 1,
        "pay": 150
    },{
        "period": "01/11/2016 - 15/11/2016",
        "employeeId": 2,
        "pay": 930
    },{
        "period": "01/12/2016 - 15/12/2016",
        "employeeId": 2,
        "pay": 240
    },{
        "period": "16/12/2016 - 31/12/2016",
        "employeeId": 2,
        "pay": 120
    },{
        "period": "01/11/2016 - 15/11/2016",
        "employeeId": 3,
        "pay": 530
    },{
        "period": "01/12/2016 - 15/12/2016",
        "employeeId": 3,
        "pay": 220
    },{
        "period": "16/12/2016 - 31/12/2016",
        "employeeId": 3,
        "pay": 120
    },{
        "period": "01/11/2016 - 15/11/2016",
        "employeeId": 4,
        "pay": 150
    }];

mysql.config({
    "user": "wave",
    "password": "test",
    "host": "wave-mysql",
    "database": "wave",
    "connectionLimit": 3
});


describe('Unit Test for model function', function () {

    beforeEach(function (done) {
        return mysql.promiseDb().query('INSERT INTO report (reportId) Values (?)', [1]).then(function () {
            return mysql.promiseDb().query('INSERT INTO payroll VALUES ?', [csvRows]);
        }).then(function () {
            done();
        });
    });


    afterEach(function (done) {
        return mysql.promiseDb().query('DELETE FROM payroll').then(function () {
            return mysql.promiseDb().query('DELETE FROM report');
        }).then(function () {
            done();
        });
    });


    it('test getReport query', function (done) {
        payrollModel.promiseGetPayrollData().then(function (rows){
            assert.deepEqual(rows, reportDate);
            done();
        });
    });
});