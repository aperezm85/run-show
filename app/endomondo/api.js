var endomondoService = require('./services');

module.exports = {

	getHomePage: function (req, res) {
        res.render('pages/endomondo/home');
    },

	getAccessToken: function (req, res) {
        var access_token = null,
        	lines = '',
        	authenticationtoken = null;
        console.log('REQ BODY = ' + JSON.stringify(req.body));
        endomondoService.getAccessToken(req.body, function (err, result) {
            if (err) {
                return res.status(401).json({error: err});
            } else {
               	lines = result.split( '\n' );	
				if( lines[ 0 ] == 'OK' )
				{
					lines.forEach( function( element, index, array ){
						var tokens = element.split( '=' );
						if( tokens[ 0 ] == 'authToken' )
						{
							authenticationtoken = tokens[ 1 ];
						}
					});
	                access_token = authenticationtoken;
	                req.session.endomondo_access_token = authenticationtoken;
	                endomondoService.getActivities(access_token, function (err, activities) {
	                    if (err) {
	                        return res.status(401).json({error: err});
	                    } else {
	                    	// console.log('activities: ' + JSON.stringify(activities));
	                        res.render('pages/endomondo/activities', {token: authenticationtoken, activities: activities});
	                    }
	                });
	            }
            }
        });
    },

    getActivity: function (req, res) {
        var activityId = req.params.id,
            access_token = req.session.endomondo_access_token;
        endomondoService.getActivity(activityId, access_token, function (err, result) {
            if (err) {
                return res.status(401).json({error: err});
            } else {
                res.render('pages/endomondo/activity', {activity: result});
            }
        });
    },
};