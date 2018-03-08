var contactsController = require('../controllers/crmController');

const crmRoutes = (app) => {
    app.route('/contact')
       .get((req, res, next) => {
           //middleware
           console.log(`Request from ${req.originalUrl}`);
           console.log(`Request type ${req.method}`);
           next();           
       }, contactsController.getContacts)
       .post(contactsController.addNewContact);
    
    app.route('/contact/:contactId')
       //get a specific contact
       .get(contactsController.getContactWithId)
       .put(contactsController.updateContact)
       .delete(contactsController.deleteContact);
}

module.exports = crmRoutes;
