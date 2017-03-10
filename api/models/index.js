'use strict';

var mysql = require('../lib/mysql'),
    self;

self = module.exports = {
    /**
     * @function promiseGetReporId
     * Given a reportId, will return the reportId if exists in database.
     * Otherwise return empty array
     */
    promiseGetReporId: function (id) {
        mysql.promiseDb().query('SELECT reportId From report WHERE reportId = ?', [id]);
    },

    /**
     * @function promiseInsertPayrollData
     * Transaction:
     * 1. Insert csv data into table payroll
     * 2. Insert reportId into table report
     */
    promiseInsertPayrollData: function (csvRows, reportId) {
        var conn = mysql.newConnection();

        return conn.beginTransaction().then(function () {
            return conn.query('INSERT INTO report (reportId) Values (?)', [reportId]);
        }).then(function () {
            return conn.query('INSERT INTO payroll VALUES ?', [csvRows]);
        }).then(function () {
            return conn.commit();
        }).catch(function (err) {
            return conn.rollback().then(function () { throw err; });
        }).finally(function () {
            return conn.end();
        });
    }
};