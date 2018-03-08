var jwt = require('jsonwebtoken');
var config = require('./config');
var authController = require('./src/controllers/authController');

class TokenService{
    verifyToken(req, res, next){
        var token = req.headers['x-access-token'];
        if(token){
            jwt.verify(token, config.jwtTokenSecret, (err, decoded) => {
                if(err){
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else{
                    authController.verifyUser(decoded.id)
                                  .then((user) => {
                                    req.authPrincipal = decoded;
                                    next();
                                  })
                                  .catch(err => {
                                    return res.status(403)
                                              .send({
                                                success: false,
                                                message: 'Invalid user'
                                            });
                                  });
                                  
                }
            });
        } else{
            return res.status(403)
                    .send({
                        success: false,
                        message: 'No token present in request'
                    });
        }
    }
}

module.exports = new TokenService();
