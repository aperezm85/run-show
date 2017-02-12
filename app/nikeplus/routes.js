var express =   require('express'),
    router =    express.Router(),
    accessApi = require ('./api'),
    config =    require('../config/config');


router.get('/', accessApi.getHomePage);

router.post('/', accessApi.getAccessToken);

router.get('/activity/:id', accessApi.getActivity);

router.get('/newactivity', accessApi.createActivity);

module.exports = router;
