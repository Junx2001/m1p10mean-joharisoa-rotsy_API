const mongoose = require("../../database/DatabaseManager").mongo;

const carSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  immatriculation: String,
  client: mongoose.Schema.Types.ObjectId,
  modele: String,
  marque: String,
  etat: String,
  dateDepot: Date,
  dateRecup: Date
});

module.exports = mongoose.model("Car", carSchema);