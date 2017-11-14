    var express = require('express');
    var controller = require('./products.controller');

    var router = express.Router();

    router.get('/', controller.index);
    router.get('/:code', controller.show);
    router.put('/:code', controller.create);

    module.exports = router; 