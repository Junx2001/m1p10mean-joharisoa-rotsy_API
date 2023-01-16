
const Reparation = require("../routes/reparations/reparation.model");

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

module.exports = {
    isCarAvailableForDeposit,
    isCarAvailableForRecover
};