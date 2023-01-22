const mongoose = require("../../database/DatabaseManager").mongo;

const paymentSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  client: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  montant: Number,
  reparation: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Reparation'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  valide: {
    type: Number,
    default: 0
  },
  responsableFinancier: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
});

module.exports = mongoose.model("Payment", paymentSchema);