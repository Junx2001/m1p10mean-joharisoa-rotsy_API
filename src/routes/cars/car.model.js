const mongoose = require("../../database/DatabaseManager").mongo;

const carSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  immatriculation: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  modele: String,
  marque: String,
  imageUrl : String
});

module.exports = mongoose.model("Car", carSchema);