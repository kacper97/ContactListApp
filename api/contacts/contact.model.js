 var mongoose = require('mongoose')
  var Schema = mongoose.Schema;

  var ContactSchema = new Schema({
    name: { type: String, required: true } ,
    address: { type: String, required: true } ,
    phone_number: { type: String, required: true }
  });

  module.exports = mongoose.model('contacts', ContactSchema);