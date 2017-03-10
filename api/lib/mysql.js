'use strict';

/**
 * Wrapper around mysql-promise. Handles connection to server.
 */
var mysql  = require('promise-mysql'),
    pool;

module.exports = {
    // Get configuration parameters and connect to database.
    config: function (cfg) {
        pool =  mysql.createPool(cfg);
    },

    // Return the promised connection pool
    promiseDb: function() {
        return pool;
    }
};