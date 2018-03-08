var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var ContactSchema = require('../models/crmModel');
var config = require('../../config');

const Contact = mongoose.model('Contact', ContactSchema);

class SecurityController{
    authenticate(req, res){
        Contact.findOne({
            userName: req.body.userName
        }, (err, contact) => {                      
            if (err) throw err;

            if(contact && passwordHash.verify(req.body.password, contact.password)){
                const payload = {
                    id: contact._id
                };

                var token = jwt.sign(payload, config.jwtTokenSecret, {
                    expiresIn: 3600
                });

                res.json({
                    success: true,
                    token: token
                });
            } else {
                res.json({
                    success: false, 
                    message: 'Invalid credentials'
                });
            }
        });
    }
}

module.exports = new SecurityController();
