const mongoo = require("mongoose");

const Car = require("./car.model");
const Reparation = require("../reparations/reparation.model");

const carService = require("../../services/car-services");

const addCar = async (req, res) => {
	
	const car = new Car({
		_id: new mongoo.Types.ObjectId(),
		immatriculation: req.body.immatriculation,
		client: req.user.userId,
		modele: req.body.modele,
  		marque: req.body.marque,
	});
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



module.exports = {
	addCar,
	depositCar,
	recoverCar,
	carListByUser,
	carDepositListByUser
};