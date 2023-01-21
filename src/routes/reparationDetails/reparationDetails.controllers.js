const mongoo = require("mongoose");

const ReparationDetails = require("./reparationDetails.model");

const addReparationDetails = async (req, res) => {

	const reparationDetail = new ReparationDetails({
		_id: new mongoo.Types.ObjectId(),
		reparation: req.body.reparation,
		intitule: req.body.intitule,
        montant: req.body.montant
	});
	reparationDetail
		.save()
		.then(async (result) => {
			await result
				.save()
					.then((result1) => {
					  console.log(`Reparation Detail has been saved ${result}`)
					  res.status(201).json({
						message: 'Reparation Detail has been saved',
						reparationDetail: reparationDetail
					  })
									})
									.catch((err) => {
					console.log(err)
					res.status(400).json({
					  message: err.toString()
					})
									});
							})
							.catch((err) => {
				console.log(err)
				res.status(500).json({
				  message: err.toString()
				})
							});
};



module.exports = {
	addReparationDetails,
	

};