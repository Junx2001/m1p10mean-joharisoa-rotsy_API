const mongoo = require("mongoose");

const Reparation = require("./reparation.model");
const ReparationDetails = require("../reparationDetails/reparationDetails.model");
const Car = require("../cars/car.model");
const User = require("../users/user.model");



const findReparationsByUser = async (req, res) => {
	const user = req.user;

	await Reparation.find().populate({
		path: 'voiture',
		populate: { path: 'client' }
	  }).exec()
		.then( async (result) => {

			result = result.filter( function(res)
				{
					if(res.voiture.client._id == user.userId){
						return true;
					}
					return false;
				}
			);
			//console.log(result);

			var arrayFinal = [];

			for(let i = 0;i<result.length;i++)
			{
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then((result1) =>{
					//console.log(result1);

					var retour = {
						repair: result[i],
						reparationDetail: result1
					};
					arrayFinal.push(retour);

					console.log(arrayFinal);


				}).catch((error) => {
					console.log(error);
					res.status(500).json({
						message: error.toString()
					  })
				});
			}
			

			res.status(200).json({
				arrayFinal
			  });


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
	
};


const findReparationsByCar = async (req, res) => {
	const immatr = req.params.immatriculation;
	const voiture = await Car.findOne({ immatriculation : immatr});
	const client = await User.findOne({ _id: voiture.client });

	if(req.user.email != client.email)
	{
		return res.status(401).json({
			message: 'You can only manage your own cars'
		  });
	}

	await Reparation.find().populate({
		path: 'voiture',
	  }).exec()
		.then( async (result) => {

			result = result.filter( function(res)
				{
					if(res.voiture.immatriculation == immatr){
						return true;
					}
					return false;
				}
			);
			//console.log(result);

			var arrayFinal = [];

			for(let i = 0;i<result.length;i++)
			{
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then((result1) =>{
					//console.log(result1);

					var retour = {
						repair: result[i],
						reparationDetail: result1
					};
					arrayFinal.push(retour);

					console.log(arrayFinal);


				}).catch((error) => {
					console.log(error);
					res.status(500).json({
						message: error.toString()
					  })
				});
			}
			

			res.status(200).json({
				arrayFinal
			  });


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
	
};

const notAffectedReparationList = async (req, res) => {
	await Reparation.find({ responsableAtelier: null}).exec().then((result) =>{
		console.log(result);

		res.status(200).json(result);
	

	}).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: error.toString()
		  })
	});

}

const affectReparation = async (req, res) => {
	const repairId = req.params.repairId;
	const respAtelierId = req.user.userId;
	await Reparation.updateOne({ _id : repairId, responsableAtelier: null},{ responsableAtelier : respAtelierId})
		.then((result) => {
						  console.log(`Reparation has been allocated to ${respAtelierId}`);
						  res.status(200).json({
							message: 'Reparation has been allocated',
							reparation: result
						  });
							})
			.catch((err) => {
						console.log(err);
						res.status(400).json({
						  message: err.toString()
						});
							});


}


module.exports = {
	findReparationsByCar,
	findReparationsByUser,
	notAffectedReparationList,
	affectReparation
	
};