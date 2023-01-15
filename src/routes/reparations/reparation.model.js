const mongoose = require("../../database/DatabaseManager").mongo;

const reparationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  intitule: String,
  voiture: mongoose.Schema.Types.Mixed,
  montant: Number,
  avancement: mongoose.Schema.Types.Decimal128,
  dateDebut: Date,
  dateFin: Date
});

module.exports = mongoose.model("Reparation", reparationSchema);