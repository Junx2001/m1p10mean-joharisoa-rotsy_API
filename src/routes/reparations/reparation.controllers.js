const mongoo = require("mongoose");

const Reparation = require("./reparation.model");
const ReparationDetails = require("../reparationDetails/reparationDetails.model");
const Car = require("../cars/car.model");
const User = require("../users/user.model");


const repairService = require("../../services/reparation-service");


const findReparation = async (req, res) => {

	await Reparation.findOne({ _id: req.params.reparationId}).populate({
		path: 'voiture',
		populate: { path: 'client' }
	  }).exec()
		.then( async (result) => {

			var retour = {};
			
				await ReparationDetails.find({ reparation: result._id}).exec().then(async (result1) =>{
					//console.log(result1);

					retour = {
						repair: result,
						reparationDetail: result1
					};


				}).catch((error) => {
					console.log(error);
					res.status(500).json({
						message: error.toString()
					  })
				});
			

			res.status(200).json(
				retour
			  );


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


const findCurrentReparationsByUser = async (req, res) => {
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

				if(retour[i].dateRecup == null)
				{
					continue;
				}

				var paidReparation = await repairService.getMontantPaidByReparation(result[i]);
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then( async (result1) =>{

					//console.log(result1);
					var montantTotal = await repairService.getMontantTotalReparation(result1);
					var avgAvancement = await repairService.getAvgAvancement(result1);


					var retour = {
						repair: result[i],
						reparationDetail: result1,
						avgAvancement: avgAvancement,
						montantTotal : montantTotal,
						totalPaid: paidReparation,
						restToPay: montantTotal-paidReparation
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


const findActualReparationsByCar = async (req, res) => {
	const immatr = req.params.immatriculation;
	const voiture = await Car.findOne({ immatriculation : immatr});
	const client = await User.findOne({ _id: voiture.client });

	if(req.user.email != client.email)
	{
		return res.status(401).json({
			message: 'You can only manage your own cars'
		  });
	}

	await Reparation.find({ dateRecup: null}).populate({
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
				var paidReparation = await repairService.getMontantPaidByReparation(result[i]);
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then( async (result1) =>{

					var montantTotal = await repairService.getMontantTotalReparation(result1);
					var avgAvancement = await repairService.getAvgAvancement(result1);
					//console.log(result1);

					var retour = {
						repair: result[i],
						montantTotal : montantTotal,
						totalPaid: paidReparation,
						restToPay: montantTotal-paidReparation,
						avgAvancement: avgAvancement,
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

const notAffectedReparationList = async (req, res) => {

	var arrayFinal = [];
	await Reparation.find({ responsableAtelier: null}).exec().then(async (result) =>{
		console.log(result);


		
		for(let i=0;i<result.length;i++)
		{
			
			const voiture = await Car.findOne({ _id: result[i].voiture});
			const client = await User.findOne({ _id: voiture.client});


			const retour = {
				repair: result[i],
				voiture: voiture,
				client: client
			};

			arrayFinal.push(retour);


		}
		


		res.status(200).json(arrayFinal);
	

	}).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: error.toString()
		  })
	});

}



const affectedReparationList = async (req, res) => {
	var conditions = {responsableAtelier: { $ne: null }, dateRecup: null};

	var arrayFinal = [];
	await Reparation.find(conditions).populate({
		path: 'voiture',
		populate: { path: 'client' }
	  }).exec().then(async (result) =>{
		console.log(result);

		if(req.query.immatriculation){
			result = result.filter( function(res)
			{
				if(res.voiture.immatriculation == req.query.immatriculation){
					return true;
				}
				return false;
			}
			);
		}

		if(req.query.marque){
			result = result.filter( function(res)
			{
				if(res.voiture.marque == req.query.marque){
					return true;
				}
				return false;
			}
			);
		}

		if(req.query.modele){
			result = result.filter( function(res)
			{
				if(res.voiture.modele == req.query.modele){
					return true;
				}
				return false;
			}
			);
		}
		if(req.query.client){
			result = result.filter( function(res)
			{
				if(res.voiture.client.name == req.query.client){
					return true;
				}
				return false;
			}
			);
		}
		if(req.query.dateDepot){
			result = result.filter( function(res)
			{
				if(res.dateDepot == req.query.dateDepot){
					return true;
				}
				return false;
			}
			);
		}

		

		res.status(200).json(result);
	

	}).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: error.toString()
		  })
	});

}

const reparationListWithDetails = async (req, res) => {
	await Reparation.find().exec().then( async (result) =>{
		//console.log(result);

		var arrayFinal = [];

			for(let i = 0;i<result.length;i++)
			{
			
				var paidReparation = await repairService.getMontantPaidByReparation(result[i]);
				
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then(async (result1) =>{
					//console.log(result1);

					var montantTotal = await repairService.getMontantTotalReparation(result1);
					var avgAvancement = await repairService.getAvgAvancement(result1);

					var retour = {
						repair: result[i],
						montantTotal : montantTotal,
						totalPaid: paidReparation,
						restToPay: montantTotal-paidReparation,
						avgAvancement: avgAvancement,
						reparationDetail: result1
					};
					arrayFinal.push(retour);

					//console.log(arrayFinal);



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

	

	}).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: error.toString()
		  })
	});

}

const validateReparation = async (req, res) => {
	const repairId = req.params.repairId;
	const respAtelierId = req.user.userId;
	await Reparation.updateOne({ _id : repairId},{ valide : 1})
		.then((result) => {
						  console.log(`Reparation has been validated (Bon de Sortie)`);
						  res.status(200).json({
							message: 'Reparation has been validated (Bon de Sortie)',
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

// TOTAL IN DAYS
const avgReparationDuration = async (req, res) => {

	const voiture = await Car.findOne({ immatriculation : req.params.immatriculation});

	await Reparation.find({ voiture: voiture._id }).sort({ dateDepot: 'desc'}).exec().then( async (result) =>{

		var arrayFinal = [];

			for(let i = 0;i<result.length;i++)
			{
				await ReparationDetails.find({ reparation: result[i]._id, dateDebut: { $ne: null}, dateFin: { $ne: null }}).exec().then(async (result1) =>{
					//console.log(result1);

					var durationTotal = await repairService.getDurationTotal(result1);

					var retour = {
						repair: result[i],
						avgDuration : durationTotal/result1.length,
	
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

	

	}).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: error.toString()
		  })
	});

}

const unpaidReparationsByUser = async (req, res) => {
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
				var paidReparation = await repairService.getMontantPaidByReparation(result[i]);
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then( async (result1) =>{

					var montantTotal = await repairService.getMontantTotalReparation(result1);
					//console.log(result1);

					var retour = {
						repair: result[i],
						reparationDetail: result1
					};
					if(paidReparation < montantTotal || result1.length == 0){
						arrayFinal.push(retour);
					}
					

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


const unpaidReparations = async (req, res) => {

	await Reparation.find().populate({
		path: 'voiture',
		populate: { path: 'client' }
	  }).exec()
		.then( async (result) => {


			var arrayFinal = [];

			

			for(let i = 0;i<result.length;i++)
			{
				var paidReparation = await repairService.getMontantPaidByReparation(result[i]);
			
				await ReparationDetails.find({ reparation: result[i]._id}).exec().then( async (result1) =>{

					var montantTotal = await repairService.getMontantTotalReparation(result1);
					//console.log(result1);

					var retour = {
						repair: result[i],
						reparationDetail: result1,
						montantTotal: montantTotal,
						totalPaid: paidReparation,
						restToPay: montantTotal - paidReparation 
						
					};
					if(paidReparation < montantTotal || result1.length == 0){
						arrayFinal.push(retour);
					}
					

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


const unpaidReparationById = async (req, res) => {

	await Reparation.findOne({ _id: req.params.repairId }).populate({
		path: 'voiture',
		populate: { path: 'client' }
	  }).exec()
		.then( async (result) => {


			var arrayFinal = [];

			

				var paidReparation = await repairService.getMontantPaidByReparation(result);
			
				await ReparationDetails.find({ reparation: result._id}).exec().then( async (result1) =>{

					var montantTotal = await repairService.getMontantTotalReparation(result1);
					//console.log(result1);

					var retour = {
						repair: result,
						reparationDetail: result1,
						montantTotal: montantTotal,
						totalPaid: paidReparation,
						restToPay: montantTotal - paidReparation 
						
					};
					if(paidReparation < montantTotal || result1.length == 0){
						arrayFinal.push(retour);
					}
					

					console.log(arrayFinal);


				}).catch((error) => {
					console.log(error);
					res.status(500).json({
						message: error.toString()
					  })
				});
			
			

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


module.exports = {
	findReparation,
	findReparationsByCar,
	findReparationsByUser,
	notAffectedReparationList,
	affectReparation,
	reparationListWithDetails,
	validateReparation,
	avgReparationDuration,
	findActualReparationsByCar,
	unpaidReparationsByUser,
	findCurrentReparationsByUser,
	affectedReparationList,
	unpaidReparations,
	unpaidReparationById

	
};