
const Reparation = require("../routes/reparations/reparation.model");

const Car = require("../routes/cars/car.model");

const fb_service = require('./firebase/firebase-service');// reference to our db 

const isCarAvailableForDeposit = async (carObject) => {
    const repar = await Reparation.find({ voiture : carObject._id, dateRecup: null});
    if (repar.length == 0){
        return true;
    }
    return false
}

const isCarAvailableForRecover = async (carObject) => {
    const repar = await Reparation.find({ voiture : carObject._id, dateRecup: null});
    if (repar.length == 0){
        return false;
    }

    return true;
}

const getCarState = async (carObject) => {
    const repar = await Reparation.find({ voiture : carObject._id, dateRecup: null});
    if (repar.length == 0){
        return "OUT OF GARAGE";
    }

    return "INSIDE GARAGE";
}


const uploadCarImage = async (req, res, car) => {
    const file = req.file;     
		// Create the file metadata
		/** @type {any} */
		const metadata = {
			contentType: file.mimetype
		};
		const storageRef = fb_service.fb_storage.ref(fb_service.storage, 'car-images/' + car._id + '.' + file.mimetype.split('/')[1]);
		const uploadTask = fb_service.fb_storage.uploadBytesResumable(storageRef, file.buffer, metadata);
		
		// Listen for state changes, errors, and completion of the upload.
		 uploadTask.on('state_changed',
			 (snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case 'paused':
				console.log('Upload is paused');
				break;
				case 'running':
				console.log('Upload is running');
				break;
			}
			}, 
			 (error) => {
			console.log(error)
			}, 
			 () => {
			// Upload completed successfully, now we can get the download URL
			 fb_service.fb_storage.getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
				console.log('File available at', downloadURL);

                await Car.updateOne({ _id: car._id}, { imageUrl: downloadURL});

				res.status(200).send({
					message: 'Your Car With its Picture has been successfully uploaded',
					url: downloadURL
				});
			});
			}
		);
}

module.exports = {
    isCarAvailableForDeposit,
    isCarAvailableForRecover,
    getCarState,
    uploadCarImage
};