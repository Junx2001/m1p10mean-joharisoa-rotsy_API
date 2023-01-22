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

const updateReparationDetails = async (req, res) => {
	const repDetails = req.body;
	await ReparationDetails.updateOne({ _id : req.params.repairDetailsId },repDetails)
		.then((result) => {
						  console.log(`Reparation Details has been updated`);
						  res.status(200).json({
							message: 'Reparation Details has been updated',
							result: result
						  });
							})
			.catch((err) => {
						console.log(err);
						res.status(400).json({
						  message: err.toString()
						});
							});
}

const deleteReparationDetails = async (req, res) => {
	await ReparationDetails.deleteOne({ _id : req.params.repairDetailsId })
		.then((result) => {
						  console.log(`Reparation Details has been deleted`);
						  res.status(200).json({
							message: 'Reparation Details has been deleted',
							result: result
						  });
							})
			.catch((err) => {
						console.log(err);
						res.status(400).json({
						  message: err.toString()
						});
							});
}

const findReparationDetails = async (req, res) => {
	await ReparationDetails.findOne({ _id: req.params.repairDetailsId}).populate({
		path: 'reparation',
		populate: { path: 'voiture', populate:{ path:'client'} }
	  }).exec()
		.then( async (result) => {

			res.status(200).json(
				result
			  );

		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
}

module.exports = {
	addReparationDetails,
	updateReparationDetails,
	deleteReparationDetails,
	findReparationDetails
	

};