var securityController = require('../controllers/securityController');

const securityRoutes = (app) => {
    app.route('/auth')
       .post(securityController.authenticate);
}

module.exports = securityRoutes;
