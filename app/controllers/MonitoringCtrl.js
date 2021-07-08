'use strict';

module.exports.monitoring = function (req, res) {
    const healthCheck  = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }

    try{

    res.send(healthCheck).end();
    }catch(error) {
        healthCheck.message = error.message;
        res.status(500).send(healthCheck);
    }
};

