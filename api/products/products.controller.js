var datastore = require('../datastore');

    // Get all product
    exports.index = function(req, res) {
        return res.status(200).json(datastore.products);
    } ;

    // Get a single product
    exports.show = function(req, res) {
         if (datastore.products[req.params.code]) {
            return res.status(200).json(datastore.products[req.params.code]);
          } else {
            return res.sendStatus(404);
          }

    };

    // Creates a new product.
    exports.create = function(req, res) {
        var product = {
           id: req.params.code,
           name: req.body.name,
           description: req.body.description 
        };
        if (datastore.products[req.params.code]) {
           return res.sendStatus(409,'Id already exists');
        } else {
           datastore.products[req.params.code] = product;
           return res.status(201).json(product);
         }
    };