
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

};