var request = require ('request'),
	config = require('../config/config');

module.exports = {

	getAccessToken: function (params, callback) {
		var email = params.email,
			password = params.password,
			url = config.endomondo.authUrl,
			action = 'pair';

		url += '?email='+email;
		url += '&password='+password;
		url += '&deviceId=' + config.endomondo.device.deviceId;
		url += '&country=' + config.endomondo.device.country;
		url += '&action=' + action;

		request.get(url, function (err, response, body) {
			if (!err) {
				callback(null, body);
			} else {
				callback(err);
			}
		});
	},

	getActivities: function (access_token, callback) {
		var url = config.endomondo.activitiesListUrl + '/list?authToken=' + access_token + '&maxResults=20';
		console.log('URL: ' + url);
		request.get(url, function (err, response, body) {
			// console.log('BODY: ' + body);
			if (!err) {
				callback(null, JSON.parse(body));
			} else {
				callback(err);
			}
		});
	},

	getActivity: function (activity_id, access_token, callback) {
		var url = config.endomondo.activity + '?authToken=' + access_token;
		url += '&fields=device,simple,basic,motivation,interval,weather,polyline_encoded_small,points,lcp_count,tagged_users,pictures';
        url += '&workoutId=' + activity_id;
		console.log('URL: ' + url);
		request.get(url, function (err, response, body) {
			if (!err) {
				callback(null, JSON.parse(body));
			} else {
				callback(err);
			}
		});
	}

};