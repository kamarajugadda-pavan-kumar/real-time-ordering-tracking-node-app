const mongoose = require("mongoose");
// ========================================================================================
// a naming convention inside JS is any varibale starting with Capital letter is either a class or a constructor function
// ========================================================================================

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});


module.exports = mongoose.model('menu',menuSchema)

