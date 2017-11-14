var _ = require('lodash')
var datastore = require('../datastore');

// Get all contacts
exports.index = function(req, res) {
    return res.status(200).json(datastore.contacts);
} ;

// Creates a new contact in datastore.
exports.create = function(req, res) {
     var nextId = 0;
        var last = _.last(datastore.contacts);
        if (last != undefined) {
           nextId = last.id + 1;
        } else {
          nextId = 1;
        }
        var contact = {
           id: nextId,
           name: req.body.name,
           address: req.body.address,
           phone_number: req.body.phone_number
        };
        datastore.contacts.push(contact);
        return res.status(201).json(contact);
};

// Update an existing contact in datastore.
exports.update = function(req, res) {
      var index = _.findIndex(datastore.contacts, function(contact) {
           return contact.phone_number == req.params.id;
        } );      
      if (index !== -1) {
          datastore.contacts.splice(index, 1, 
               {name: req.body.name, address: req.body.address , 
                         phone_number: req.body.phone_number });
          return res.sendStatus(200);
        } 
      return res.sendStatus(404) ;
};

// Deletes a contact from datastore.
exports.destroy = function(req, res) {
       var elements = _.remove(datastore.contacts , 
               function(contact) {
                  return contact.id == req.params.id;
            });  
         if (elements.length == 1) {
            return res.sendStatus(200);
          } else {
             return res.sendStatus(404);
          }
};