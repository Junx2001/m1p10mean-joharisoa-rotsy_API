const mongoo = require("mongoose");

const Depense = require("./depenses.model");

const addDepense = async (req, res) => {

	const depense = new Payment({
		_id: new mongoo.Types.ObjectId(),
		intitule: req.body.intitule,
		montant: req.body.montant,
	});
	depense
		.save()
		.then(async (result) => {
			await result
				.save()
					.then((result1) => {
					  console.log(`Depense has been registered ${result}`)
					  res.status(201).json({
						message: 'Depense has been registered',
						reparation: depense
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



const findAllDepenses = async (req, res) => {

	await Depense.find().exec()
		.then((result) => {

			console.log(result);
			res.status(200).json(result);

		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: error.toString()
			  })
		});

}

const statsDepensesParMois = async (req, res) => {
	const annee = parseInt(req.params.annee);
	Depense.aggregate(
		[
			{$project: {date: "$date",montant: "$montant", year: {$year: '$date'}}},
  			{$match: {year: annee}},
			{$group: {
			  _id: { $month: '$date'},
			  totalCA: {
				$sum: "$montant"
			  }
			}}
		  
		],
	
		function(err, result) {
		  if (err) {
			res.send(err);
		  } else {
			res.json(result);
		  }
		}
	  );

}


module.exports = {
	addDepense,
	findAllDepenses,
	statsDepensesParMois

};