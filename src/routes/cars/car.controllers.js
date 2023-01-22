const mongoo = require("mongoose");

const Car = require("./car.model");
const Reparation = require("../reparations/reparation.model");

const carService = require("../../services/car-services");

const repairService = require("../../services/reparation-service");

const addCar = async (req, res) => {
	
	const car = new Car({
		_id: new mongoo.Types.ObjectId(),
		immatriculation: req.body.immatriculation,
		client: req.user.userId,
		modele: req.body.modele,
  		marque: req.body.marque,
	});

	const voiture = await Car.find({ immatriculation : req.body.immatriculation});
	if(voiture.length > 0){
		res.status(409).json({
			message:"Car already added in "
		  });
	}
	else{
		car
		.save()
		.then(async (result) => {
			await result
				.save()
					.then((result1) => {
                      console.log(`Car has been added to your list of car ${result}`)
                      res.status(201).json(car)
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
	}
	
};

const depositCar = async (req, res) => {
	const immatr = req.params.immatriculation
	const voiture = await Car.findOne({ immatriculation : immatr});
	if(!voiture){
		return res.status(404).json({
			message: "Vehicule Not Found"
		  });
	}

	const canDeposit = await carService.isCarAvailableForDeposit(voiture);

	if(canDeposit){
		const reparation = new Reparation({
			_id: new mongoo.Types.ObjectId(),
			voiture: voiture._id,
			responsableAtelier: null,
			dateRecup: null
		});
		reparation
			.save()
			.then(async (result) => {
				await result
					.save()
						.then((result1) => {
						  console.log(`Car has been deposit ${result}`)
						  res.status(201).json({
							message: 'Car has been deposit',
							reparation: reparation
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
	}
	else{
		res.status(500).json({
			message: "Your car is on reparation"
		  });
	}
	
};


const recoverCar = async (req, res) => {

	const immatr = req.params.immatriculation
	const voiture = await Car.findOne({ immatriculation : immatr});
	if(!voiture){
		return res.status(404).json({
			message: "Vehicule Not Found"
		  });
	}

	
	const canBeRecovered = await carService.isCarAvailableForRecover(voiture);

	if(canBeRecovered)
	{
		await Reparation.updateOne({ voiture : voiture._id, dateRecup: null}, { dateRecup: Date.now()})
		.then((result) => {
						  console.log(`Car has been recovered`);
						  res.status(200).json({
							message: 'Car has been recovered',
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
	else
	{
		res.status(500).json({
			message: "Your car is not in the garage"
		  });
	}

};

const carListByUser = async (req, res) => {
	const user = req.user;
	var arrayFinal = [];

	await Car.find({ client : user.userId}).exec()
		.then(async (result) => {

			for(let i = 0;i < result.length;i++)
			{
				var carState = await carService.getCarState(result[i]);
				var retour = {
					car: result[i],
					state: carState,
				};
				arrayFinal.push(retour);

			}
			
			res.status(200).json(arrayFinal);


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
};

const carDepositListByUser = async (req, res) => {
	const user = req.user;
	var arrayFinal = []

	await Car.find({ client : user.userId}).exec()
		.then(async (result) => {

			for(let i = 0;i < result.length;i++)
			{
				var carState = await carService.getCarState(result[i]);
				if(carState == "INSIDE GARAGE"){
					arrayFinal.push(result[i]);
				}
	

			}
			
			res.status(200).json(arrayFinal);


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
};

const searchCar = async (req, res) => {

	var arrayFinal = [];
	var conditions = {};
	if(req.query.immatriculation){
		conditions.immatriculation = { $regex: '.*' + req.query.immatriculation + '.*', $options: 'i' };
	}
	if(req.query.marque){
		conditions.marque = { $regex: '.*' + req.query.marque + '.*', $options: 'i' };
	}
	if(req.query.modele){
		conditions.modele = { $regex: '.*' + req.query.modele + '.*', $options: 'i' };
	}

	await Car.find(conditions).exec()
		.then(async (result) => {

			for(let i = 0;i < result.length;i++)
			{
				var carState = await carService.getCarState(result[i]);
				var retour = {
					car: result[i],
					state: carState,
				};
				arrayFinal.push(retour);

			}
			
			res.status(200).json(arrayFinal);


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
};

const allCars = async (req, res) => {

	await Car.find().exec()
		.then(async (result) => {
			
			res.status(200).json(result);


		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
};


const recoverableCarByUser = async (req, res) =>{
	const user = req.user;
	var arrayFinal = [];

	await Car.find({ client : user.userId}).exec()
		.then(async (result) => {

			for(let i = 0;i < result.length;i++)
			{
				await Reparation.findOne({ voiture: result[i]._id, valide:1, dateRecup:null }).exec().then( async (result1) =>{

					if(result1 != null){
						arrayFinal.push(result[i]);
					}
				
					
				}).catch((error) => {
					console.log(error);
					res.status(500).json({
						message: error.toString()
					  })
				});

	
			}
			
			res.status(200).json(arrayFinal);

		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});
}



module.exports = {
	addCar,
	depositCar,
	recoverCar,
	carListByUser,
	carDepositListByUser,
	searchCar,
	recoverableCarByUser,
	allCars
};