var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var ContactSchema = require('../models/crmModel');

const Contact = mongoose.model('Contact', ContactSchema);

class ContactController{
    addNewContact(req, res){
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    getContacts(req, res){
        Contact.find({}, (err, contacts) => {
            if(err){
                res.send(err);
            }
            res.json(contacts);
        });
    }

    getContactWithId(req, res){
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    updateContact(req, res){
        req.body.password = passwordHash.generate(req.body.password);
        Contact.findOneAndUpdate({
            _id: req.params.contactId
        }, req.body, {new: true}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    deleteContact(req, res){
        Contact.remove({
            _id: req.params.contactId
        }, (err) => {
            if(err){
                res.send(err, contact);
            }
            res.json({message: 'Successfully deleted contact'});
        });
    }
}

module.exports = new ContactController();
