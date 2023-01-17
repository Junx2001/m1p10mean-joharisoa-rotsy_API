const mongoose = require("../../database/DatabaseManager").mongo;

const reparationDetailsSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  reparation: mongoose.Schema.Types.ObjectId,
  intitule: String,
  montant: Number,
  avancement: Number,
  dateDebut: Date,
  dateFin: Date,
  
});

module.exports = mongoose.model("ReparationDetails", reparationDetailsSchema);