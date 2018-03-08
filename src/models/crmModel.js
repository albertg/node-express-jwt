var mongoose = require('mongoose');
var passwordHash = require('password-hash');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userName:{
        type: String,
        required: 'Enter a unique username',
        unique: true
    },
    password: {
        type: String,
        required: 'Enter a strong password'
    },
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

//set pre-hook to hash password before save
ContactSchema.pre('save', function(next){    
    var contact = this;  
    //hash the password
    contact.password = passwordHash.generate(contact.password);
    next();
});

module.exports = ContactSchema;
