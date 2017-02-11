var endomondoService = require('./services');

module.exports = {

	getHomePage: function (req, res) {
        res.render('pages/home');
    }
};