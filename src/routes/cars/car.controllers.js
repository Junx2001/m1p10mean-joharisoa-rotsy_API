const mongoo = require("mongoose");

const Car = require("./car.model");



const depositCar = async (req, res) => {
	
	const car = new Car({
		_id: new mongoo.Types.ObjectId(),
		immatriculation: req.body.immatriculation,
		client: req.user.userId,
		modele: req.body.modele,
  		marque: req.body.marque,
  		etat: req.body.etat,
  		dateDepot: Date.now(),
	});
	car
		.save()
		.then(async (result) => {
			await result
				.save()
					.then((result1) => {
                      console.log(`Car has been deposit ${result}`)
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


const recoverCar = async (req, res) => {
	
	const immatr = req.params.immatriculation;
	await Car.updateOne({ immatriculation: immatr }, { etat: 'ab' , dateRecup: Date.now()})
		.then((result) => {
                      console.log(`Car has been recovered`);
                      res.status(201).json(result);
						})
		.catch((err) => {
                    console.log(err)
                    res.status(400).json({
                      message: err.toString()
                    })
						});
};



module.exports = {
	depositCar,
	recoverCar
};