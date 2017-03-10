'use strict';

/**
 * Error handler that logs the error and send it back with response
 *
 * 1. validation error: handles validation errors and send it with validation error code 400
 * 2. internal error: handles server internal error and send it with error code 500
 */
var logger = require('./logger');

module.exports = function errorHandler() {
    return function errorHandler(err, req, res, next) {
        var key, error;

        logger.warn({
            event:  'apierror',
            error:  err,
            req:    req
        });
        if (err.validation) {
            return res.status(400).json(err.validation);
        }

        error = { code: "INTERNAL_ERROR", path: "#/" };
        error.name = err.name;
        error.message = err.message;
        error.stack = err.stack;

        for (key in err) {
            if (err.hasOwnProperty(key)) { error[key] = err[key]; }
        }

        // Only send error message if a response was not yet sent.
        if (!res.headersSent) { res.status(500).json({ error: [ error ] }); }
    };
};
