const mongoose = require("../../database/DatabaseManager").mongo;

const reparationSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  voiture: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  responsableAtelier: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateDepot: {
    type: Date,
    default: Date.now()
  },
  dateRecup: Date,
  valide: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Reparation", reparationSchema);