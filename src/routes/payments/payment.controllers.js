const mongoo = require("mongoose");

const Payment = require("./payment.model");

const addPayment = async (req, res) => {

	const payment = new Payment({
		_id: new mongoo.Types.ObjectId(),
		client: req.user.userId,
		montant: req.body.montant,
		reparation: req.body.reparation,
	});
	payment
		.save()
		.then(async (result) => {
			await result
				.save()
					.then((result1) => {
					  console.log(`Payment has been saved ${result}`)
					  res.status(201).json({
						message: 'Payment has been saved',
						reparation: payment
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


const validatePayment = async (req, res) => {
	const paymentId = req.params.paymentId;
	const respFinanceId = req.user.userId;
	await Payment.updateOne({ _id : paymentId },{ valide : 1, responsableFinancier: respFinanceId})
		.then((result) => {
						  console.log(`Payment has been validated by Resp Financier`);
						  res.status(200).json({
							message: 'Payment has been validated by Resp Financier',
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

const findAllPayments = async (req, res) => {

	await Payment.find().exec()
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


module.exports = {
	addPayment,
	validatePayment,
	findAllPayments

};