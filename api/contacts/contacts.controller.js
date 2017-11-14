var _ = require('lodash')
var datastore = require('../datastore');

// Get all contacts
exports.index = function(req, res) {
    return res.status(200).json(datastore.contacts);
} ;

// Creates a new contact in datastore.
exports.create = function(req, res) {
     // TODO
};

// Update an existing contact in datastore.
exports.update = function(req, res) {
      // TODO
};

// Deletes a customer from datastore.
exports.destroy = function(req, res) {
       // TODO
};