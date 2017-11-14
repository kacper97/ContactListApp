   var _ = require('lodash')
    var datastore = require('../datastore');

    // Get all customers
    exports.index = function(req, res) {
        return res.status(200).json(datastore.customers);
    } ;

    // Get a single customer
    exports.show = function(req, res) {
        var index = _.findIndex(datastore.customers , 
               function(customer) {
                  return customer.id == req.params.id;
            });      
         if (index != -1) {
            return res.status(200).json((datastore.customers[index]));
          }
          else {
             return res.sendStatus(404);
           }

    };

    // Creates a new customer.
    exports.create = function(req, res) {
        var nextId = 0;
        var last = _.last(datastore.customers);
        if (last != undefined) {
           nextId = last.id + 1;
        } else {
          nextId = 1;
        }
        var customer = {
           id: nextId,
           name: req.body.name,
           address: req.body.address 
        };
        datastore.customers.push(customer);
        return res.status(201).json(customer);
    };

    // Delete a customer.
    exports.destroy = function(req, res) {
        var elements = _.remove(datastore.customers , 
               function(customer) {
                  return customer.id == req.params.id;
            });  
         if (elements.length == 1) {
            return res.sendStatus(200);
          } else {
             return res.sendStatus(404);
          }
    };