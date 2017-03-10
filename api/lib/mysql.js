'use strict';

/**
 * Wrapper around mysql-promise. Handles connection to server.
 */
var mysql  = require('promise-mysql'),
	conf,
    pool;

module.exports = {
    // Get configuration parameters and connect to database.
    config: function (cfg) {
    	conf = cfg;
        pool =  mysql.createPool(cfg);
    },

    // Return the promised connection pool
    promiseDb: function() {
        return pool;
    },

    // Create a new connection for transaction purpose
    newConnection: function() {
    	return mysql.createConnection({
    		host: conf.host,
    		user: conf.user,
    		password: conf.password,
    		database: conf.database
    	}).then(function (conn) {
    		return conn;
    	});
    }
};