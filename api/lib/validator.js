'use strict';

/**
 * Validator library to throw validation errors
 */
function validationError(e) {
    var err = new Error();
    err.validation = e;
    throw err;
}

function isInt(value) {
    var x;
    if (isNaN(value) || value.indexOf('.') > -1) {
        return false;
    }

    x = parseInt(value);
    return Number(value) === x;
}

module.exports = {
    validate: function(e) {
        return validationError(e);
    },

    isInteger: function(i, e){
        if (!isInt(i)) {
            return validationError({code: 'INVALID_VALUE', message: e});
        }
    },

    isNumber: function(i, e){
        if (isNaN(i)) {
            return validationError({code: 'INVALID_VALUE', message: e});
        }
    }
};