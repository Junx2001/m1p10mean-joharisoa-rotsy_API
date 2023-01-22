const mongoose = require("../../database/DatabaseManager").mongo;

const depenseSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  intitule: String,
  montant: Number,
  date: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Depense", depenseSchema);