var mongoose = require('mongoose');
var ContactSchema = require('../models/crmModel');

const Contact = mongoose.model('Contact', ContactSchema);

class AuthController{
    verifyUser(userId){  
        return new Promise((resolve, reject) => {
            Contact.findById(userId, (err, user) => {
                if(err){ 
                    reject(err);
                } else{
                    if(user){
                        resolve(user);
                    }else{
                        reject({message: 'Invalid user'});
                    }
                }
            });
        });  
    }
}

module.exports = new AuthController();