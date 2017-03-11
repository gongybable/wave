'use strict';

/**
 * Read files from a readstream, and parse the file.
 */
var Promise   = require('bluebird'),
    fs        = require('fs'),
    parse     = require('csv-parse'),
    validator = require('./validator'),

    // Constants
    ID_STRING = 'report id',
    JOB_GROUP = ['A', 'B'];

// convert date string into proper mysql date format
function convertDate(dateStr, row) {
    var dateAry, year, month, day;

    dateAry = dateStr.split('/');

    year = dateAry[2];
    month = dateAry[1];
    day = dateAry[0];

    validator.isInteger(year, 'File data invalid for cloumn "date" at row: ' + row);
    validator.isInteger(month, 'File data invalid for cloumn "date" at row: ' + row);
    validator.isInteger(day, 'File data invalid for cloumn "date" at row: ' + row);

    return year + '-' + month + '-' + day;
}
module.exports = {
    // create a read stream and read the file line by line
    promiseReadSream: function promiseReadSream(filePath, reportId) {
        var csvdata = [],
            counter = 0;

        return new Promise(function (resolve, reject) {
            var readStream = fs.createReadStream(filePath);

            readStream.pipe(parse({delimiter: ','}))
                .on('data', function(csvRow){
                    // skip the hear line and the footer line
                    if (counter > 0 && csvRow[0] !== ID_STRING) {
                        validator.isNumber(csvRow[1], 'File data invalid for cloumn "hours worked" at row: ' + (counter + 1));
                        validator.isInteger(csvRow[2], 'File data invalid for cloumn "employee id" at row: ' + (counter + 1));

                        // job group has to be either A or B
                        if (JOB_GROUP.indexOf(csvRow[3]) === -1 ) {
                            validator.validate({code: 'INVALID_VALUE', message: 'File data invalid for cloumn "job group" at row: ' + (counter + 1)});
                        }

                        // each row contains the following data:
                        // [reportId, date, hours, employeeId, jobGroup]
                        csvRow[4] = csvRow[3];
                        csvRow[3] = parseInt(csvRow[2]);
                        csvRow[2] = Number(csvRow[1]);
                        csvRow[1] = convertDate(csvRow[0], counter + 1);
                        csvRow[0] = reportId;
                        csvdata.push(csvRow);
                    }
                    counter++;
                })
                .on('end', function(){
                    resolve(csvdata);
                })
                .on('error', function(err) {
                    reject(err);
                });
        });
    }
};
