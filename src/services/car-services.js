
const Reparation = require("../routes/reparations/reparation.model");

const isCarAvailableForDeposit = async (carObject) => {
    const repar = await Reparation.find({ voiture : carObject._id});
    if (repar.length == 0){
        return true;
    }
    else{
        for(let i = 0;i<repar.length;i++){
            if(repar[i].dateRecup == null){
                return false;
            }
        }
    }
    return false;
}

module.exports = {
    isCarAvailableForDeposit
};