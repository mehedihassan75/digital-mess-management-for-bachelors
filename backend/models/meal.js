const mongoose = require("mongoose");
const Meal = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  sourav: {
    type: String,
    required: true,
  },
  mehedi: {
    type: String,
    required: false,
  },
  shakil: {
    type: String,
    required: false,
  },
});
module.exports = Meal;
