'use strict';

var payrollModel   = require('../models/index'),
    logger         = require('../lib/logger'),
    fileReader     = require('../lib/file-reader'),
    lastLineReader = require('../lib/lastline-reader'),
    validator      = require('../lib/validator');

module.exports = function (router) {

    function allowOrigin(req, res) {
        var head = req.headers.origin;
        if (head) {
            res.setHeader('Access-Control-Allow-Origin', head);
        }
    }

    router.get('/report', function (req, res, next) {
        logger.info({
            req: req,
            res: res
        });

        allowOrigin(req, res);

        return payrollModel.promiseGetPayrollData().then(function (rows){
            res.json(rows);
        }).catch(next);
    });

    router.post('/upload', function(req, res, next){
        var filePath, reportId;

        logger.info({
            req: req,
            res: res
        });

        if (!req.files || !req.files.file || !req.files.file.path || typeof req.files.file.path !== 'string') {
            validator.validate({code: 'MISSING_REQUIRED_PROPERTY', message: 'Upload file not found'});
        }

        filePath = req.files.file.path;

        allowOrigin(req, res);

        return  lastLineReader.promiseReadLastLine(filePath).then(function (data){
            reportId = data.split(',')[1];
            validator.isInteger(reportId, 'File data invalid for \"report id\"');
            reportId = parseInt(reportId);
            return payrollModel.promiseGetReporId(reportId);
        }).then(function (ids) {
            if (ids.length === 0) {
                return fileReader.promiseReadSream(filePath, reportId).then(function (rows) {
                    return payrollModel.promiseInsertPayrollData(rows, reportId);
                }).then(function () {
                    res.json({duplicateReportId: false});
                });
            }
            res.json({duplicateReportId: true});
        }).catch(next);
    });
};