var errors = {
    '400': 'Bar Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Server Error'
};

module.exports = function(code, message){
    message = message || errors['' + code];

    return {
        status: message && code || 500,
        message: message || 'Server Error'
    }
}