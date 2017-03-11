'use strict';

var mysql = require('../lib/mysql'),

    // Constants
    PAY_A = 20,
    PAY_B = 30;

module.exports = {
    /**
     * @function promiseGetReporId
     * Given a reportId, will return the reportId if exists in database.
     * Otherwise return empty array
     */
    promiseGetReporId: function (id) {
        return mysql.promiseDb().query('SELECT reportId From report WHERE reportId = ?', [id]);
    },

    /**
     * @function promiseInsertPayrollData
     * Transaction:
     * 1. Insert csv data into table payroll
     * 2. Insert reportId into table report
     */
    promiseInsertPayrollData: function (csvRows, reportId) {
        var conn;

        return mysql.newConnection().then(function (connection) {
            conn = connection;
            return conn.beginTransaction();
        }).then(function () {
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
    },

    /**
     * @function promiseGetPayrollData
     * Return the data for the report
     */
    promiseGetPayrollData: function () {
        var query =
                'SELECT ' +
                'CASE WHEN DAY(`date`) < 16 ' +
                    'THEN CONCAT("01/", LPAD(MONTH(`date`), 2, "0"), "/", YEAR(`date`), " - ", "15/", MONTH(`date`), "/", YEAR(`date`)) ' +
                    'ELSE CONCAT("16/", LPAD(MONTH(`date`), 2, "0"), "/", YEAR(`date`), " - ", RIGHT( LAST_DAY( `date` ), 2), "/", MONTH(`date`), "/", YEAR(`date`)) ' +
                'END as period, ' +
                'employeeId as employeeId, ' +
                'SUM( IF(jobGroup="A", hours*?, hours*?) ) as pay ' +
                'FROM payroll ' +
                'GROUP BY period, employeeId ' +
                'ORDER BY employeeId, SUBSTRING(period, 7, 4), SUBSTRING(period, 4, 2),SUBSTRING(period, 1, 2)';
        return mysql.promiseDb().query(query, [PAY_A, PAY_B]);
    }
};