var createuuid = require( 'uuidv5' ),
    os = require( 'os' ),
    uuid = createuuid( 'dns', os.hostname() );

module.exports = {

    nike: {
    	accessTokenUrl: 'https://developer.nike.com/services/login',
        activitiesListUrl: 'https://api.nike.com/v1/me/sport/activities',
        activity: 'https://api.nike.com/v1/me/sport/activities/',


        activitiesListUrlv3: 'https://api.nike.com/sport/v3/me/activities/before_time/',
        activityv3: 'https://api.nike.com/sport/v3/me/activity/',
        addActivity: 'https://api.nike.com/v2.0/me/sync'
    },

    endomondo: {
        authUrl: 'https://api.mobile.endomondo.com/mobile/auth',
        activitiesListUrl: 'https://api.mobile.endomondo.com/mobile/api/workout',
        activity: 'https://api.mobile.endomondo.com/mobile/api/workout/get',
        device: {
            'deviceId':     uuid,
            'os':           'Android',
            'model':        'HTC Vision',
            'osVersion':    '2.3.7',
            'vendor':       'github/swyphcosmo',
            'appVariant':   'M-Pro',
            'country':      'GB',
            'v':            '2.4', // No idea, maybe api version?
            'appVersion':   '7.1'
        }
    },

//Endomondo
// var URL_AUTHENTICATE    = 'https://api.mobile.endomondo.com/mobile/auth';
// var URL_WORKOUTS        = 'https://api.mobile.endomondo.com/mobile/api/workout';
// var URL_WORKOUT_GET     = 'https://api.mobile.endomondo.com/mobile/api/workout/get';
// var URL_WORKOUT_POST    = 'https://api.mobile.endomondo.com/mobile/api/workout/post';
// var URL_TRACK           = 'https://api.mobile.endomondo.com/mobile/track';
// var URL_PLAYLIST        = 'https://api.mobile.endomondo.com/mobile/playlist';

// var URL_ACCOUNT_GET     = 'https://api.mobile.endomondo.com/mobile/api/profile/account/get';
// var URL_ACCOUNT_POST    = 'https://api.mobile.endomondo.com/mobile/api/profile/account/post';



    db: {
        production: "mongodb://user:pass@example.com:1234/stroeski-prod",
        development: "mongodb://localhost:27017/socialmanager-dev",
        test: "mongodb://localhost:27017/socialmanager-test"
    },
    cookies: {
        maxAge: 24 * 60 * 60 // 4 hours in seconds
    },
    secret: 'thisisasecretstringforoursociableapp'
}




