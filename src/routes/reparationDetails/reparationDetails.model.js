const mongoose = require("../../database/DatabaseManager").mongo;

const reparationDetailsSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  reparation:  {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Reparation'
  },
  intitule: String,
  montant: Number,
  avancement: {
    type: Number,
    default: 0
  },
  dateDebut: {
    type: Date,
    default: Date.now()
  },
  dateFin: {
    type: Date,
    default: null
  },
  
});

module.exports = mongoose.model("ReparationDetails", reparationDetailsSchema);