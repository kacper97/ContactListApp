 module.exports = function(app) {
      app.use('/api/contacts', require('./api/contacts/index'));
    };
