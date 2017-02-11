var express =   require('express'),
    router =    express.Router(),
    accessApi = require ('./api'),
    config =    require('../config/config');


router.get('/', accessApi.getHomePage);

module.exports = router;
