var appRouter = require('./app/routes'),
	nikeRouter = require('./nikeplus/routes'),
	endomondoRouter = require('./endomondo/routes');

module.exports = {
    apply: function (app) {
        'use strict';
        app.use('/', appRouter);
        app.use('/nike', nikeRouter);
        app.use('/endomondo', endomondoRouter);
    }
};