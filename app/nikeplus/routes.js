var express =   require('express'),
    router =    express.Router(),
    accessApi = require ('./api'),
    config =    require('../config/config');


router.get('/', accessApi.getHomePage);

router.post('/', accessApi.getAccessToken);

router.get('/activity/:id', accessApi.getActivity);

module.exports = router;
