const mongoo = require("mongoose");

const Reparation = require("./reparation.model");
const Car = require("../cars/car.model");




const findReparationsByCar = async (req, res) => {
	const immatr = req.params.immatriculation;
	const voiture = await Car.findOne({ immatriculation : immatr});
	if(req.user.email != voiture.client.email)
	{
		return res.status(401).json({
			message: 'You can only manage your own cars'
		  });
	}

	await Reparation.find({ 'voiture.immatriculation' : immatr }).exec()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				reparations: result
			  })
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
	
};

const findReparationsByUser = async (req, res) => {
	const user = req.user;

	await Reparation.find({ 'voiture.client.email' : user.email }).exec()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				reparations: result
			  })
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
	
};



module.exports = {
	findReparationsByCar,
	findReparationsByUser
};