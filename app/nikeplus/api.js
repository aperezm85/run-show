var nikeService = require('./services');

module.exports = {

    getHomePage: function (req, res) {
        res.render('pages/nike/home', {error: false});
    },

    getAccessToken: function (req, res) {
        var access_token = null;
        console.log('REQ BODY = ' + JSON.stringify(req.body));
        nikeService.getAccessToken(req.body, function (err, result) {

            // console.log('ERR: ' + err);
            // console.log('result: ' + JSON.stringify(result));
            if (err || result.error || !result.access_token) {
                if (result && result.error.indexOf("401") !== -1) {
                    res.render('pages/nike/home', {error: "Username or password invalid. Please try again."});
                } else {
                    res.render('pages/nike/home', {error: "Please try again."});
                }
            } else {
                access_token = result.access_token;
                req.session.nike_access_token = result.access_token;
                nikeService.getActivities(access_token, function (err, activities) {
                    if (err) {
                        return res.status(401).json({error: err});
                    } else {
                        res.render('pages/nike/activities', {token: result, activities: activities});
                    }
                });
            }
        });
    },


    getActivity: function (req, res) {
        var activityId = req.params.id,
            access_token = req.session.nike_access_token;
        nikeService.getActivity(activityId, access_token, function (err, result) {
            if (err) {
                return res.status(401).json({error: err});
            } else {
                res.render('pages/nike/activity', {activity: result});
            }
        });
    },

    createActivity: function (req, res) {
        var access_token = req.session.nike_access_token;
    },

    logout: function (req, res) {
        req.logout();
        return res.status(200).json({message: 'OK'});
    },

    login: function (req, res) {
        accessService.loginApi(req.body, function (err, result) {
            if (err) {
                return res.status(401).json({ error: err});
            }
            res.status(200).json(result);
        });
    },

    loggedin: function (req, res) {
        if (req.get('token')) {
            var token = req.get('token');
            accessService.loggedinApi(token, function (err, result) {
                if (err) {
                    return res.status(401).json({ error: err});
                }
                res.status(200).json(result);
            });
        } else {
            res.status(401).send({error: 'Authentication headers missing.'});
        }
    }
};