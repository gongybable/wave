'use strict';

/**
 * Handles the logger configuration and exports a logger
 */
var bunyan = require('bunyan'),
    logger;

// Request serializer
function requestSerializer(req) {
    if (!req) { return {}; }

    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}

// Response serializer
function responseSerializer(res) {
    if (!res) { return {}; }

    return {
        statusCode:   res.statusCode,
        headers:      res.headers
    };
}

// Error serializer
function errorSerializer(err) {
    if (!err) { return undefined; }

    if ('string' === typeof err) { return { message: err }; }

    if (Array.isArray(err)) { return err.map(errorSerializer); }

    if (err instanceof Error) {
        return { message: err.message, stack: err.stack };
    }

    return err;
}

logger = bunyan.createLogger({
    name: "wave",
    streams: [{
        level: "info",
        stream: process.stdout
    }],
    serializers: {
        req:   requestSerializer,
        res:   responseSerializer,
        error: errorSerializer
    }
});

module.exports = logger;