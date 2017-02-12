
//Apple watch
//https://api.nike.com/sport/v3/me/activity/c24fdcd2-2204-463d-be3a-bf58ea4e4178?metrics=ALL&access_token=Q2Cxrf5RN9cDbAjQ871wAISa9tZK

var request = require ('request'),
	config = require('../config/config');

module.exports = {


	getAccessToken: function (params, callback) {
		var email = params.email,
			password = params.password;

		request.post(config.nike.accessTokenUrl, {
			form: { 
				username: encodeURI(email),
				password: encodeURI(password) 
			}}, function (err, response, body) {
				if (!err) {
					callback(null, JSON.parse(body));
				} else {
					callback(err);
				}
			}
		);
	},

	getActivities: function (access_token, callback) {
		// var url = config.nike.activitiesListUrl + '?access_token=' + access_token + '';
		var today_date = new Date().getTime(),
			url = config.nike.activitiesListUrlv3 + today_date;
		url += '?access_token=' + access_token;
		url += '&' + 'types=' + 'jogging,run';
		console.log('URL: ' + url);
		request.get(url, function (err, response, body) {
			if (!err) {
				callback(null, JSON.parse(body));
			} else {
				callback(err);
			}
		});
	},

	getActivity: function (activity_id, access_token, callback) {
		var url = config.nike.activityv3 + activity_id + '?access_token=' + access_token;
		url += '&metrics=' + 'ALL';
		console.log('URL: ' + url);
		request.get(url, function (err, response, body) {
			if (!err) {
				callback(null, JSON.parse(body));
			} else {
				callback(err);
			}
		});
	},

	createActivity: function (access_token, body, callback) {
		var url = config.nike.addActivity + '?access_token=' + access_token,
			headers = {
		      'appid': 'NIKEPLUSGPS',
		      'Content-Type': 'application/json'
		    },
		    form = this.generateNikeJsonActivity(null);


		console.log('URL: ' + url);
		
		request.post({ url: url, body: JSON.stringify(form), headers: headers }, function (err, response, body) {
			console.log('ERR: ' + err);
			console.log('response: ' + JSON.stringify(response));
			console.log('body: ' + body);
			if (!err) {
				callback(null, JSON.parse(body));
			} else {
				callback(err);
			}
		});
	},


	generateNikeJsonActivity: function (obj) {
		return {
    "distance": 2.317167236328125,
    "type": "run",
    "startTime": 1402763450520,
    "tags": [{
        "ActivityTag": {
            "tagTypeDetail": "OUTDOORS",
            "tagType": "LOCATION"
        }
    }],
    "fuel": 573,
    "calories": 155.6595,
    "summary": {
        "snapshots": [{
            "dataSeries": [{
                "metrics": {
                    "GPSLAT": 55.95920514416589,
                    "duration": 312802,
                    "distance": 1,
                    "GPSLong": -3.190870802899678
                },
                "objType": "dataPoint"
            }],
            "name": "mileSplit"
        }, {
            "dataSeries": [{
                "metrics": {
                    "GPSLAT": 55.95895486114505,
                    "duration": 196084,
                    "distance": 1,
                    "GPSLong": -3.192899271598435
                },
                "objType": "dataPoint"
            }, {
                "metrics": {
                    "GPSLAT": 55.96172383350541,
                    "duration": 363439,
                    "distance": 2,
                    "GPSLong": -3.195085209129428
                },
                "objType": "dataPoint"
            }],
            "name": "kmSplit"
        }],
        "deviceConfig": [{
            "component": {
                "type": "iphone",
                "category": "device"
            }
        }]
    },
    "detail": [{
        "intervalType": "time",
        "intervalUnit": "sec",
        "startTimeOffset": 0,
        "intervalMetric": "10",
        "metricType": "distance",
        "value": [0, 0, 0, 0, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 0.3394478052368095, 1.360067174999987],
        "objType": "dataStream"
    }, {
        "intervalType": "time",
        "intervalUnit": "sec",
        "startTimeOffset": 0,
        "intervalMetric": "10",
        "metricType": "speed",
        "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 787.7937826303585],
        "objType": "dataStream"
    }, {
        "intervalType": "time",
        "intervalUnit": "sec",
        "startTimeOffset": 0,
        "intervalMetric": "10",
        "metricType": "gpsSignalStrength",
        "value": ["0.000000", "0.000000", "5.000000", "5.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "10.000000", "5.000000", "5.000000", "5.000000", "5.000000", "5.000000", "5.000000", "5.000000", "10.000000"],
        "objType": "dataStream"
    }],
    "status": "complete",
    "timeZoneId": "Europe\/London",
    "duration": 489550.1098632812
};
	}

};