const mongoose = require("../../database/DatabaseManager").mongo;

const carSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  immatriculation: String,
  client: mongoose.Schema.Types.Mixed,
  modele: String,
  marque: String,
  etat: String,
  dateDepot: Date,
  dateRecup: Date
});

module.exports = mongoose.model("Car", carSchema);