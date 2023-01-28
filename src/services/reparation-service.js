const Payment = require("../routes/payments/payment.model");


const getMontantTotalReparation = async (repairDetailsArray) => {
    var total = 0;
    for(let i = 0;i<repairDetailsArray.length;i++)
    {
        var repairDetail = repairDetailsArray[i];
        total += repairDetail.montant;
    }

    return total;
}

const getAvgAvancement = async (repairDetailsArray) => {
    var total = 0;

    for(let i = 0;i<repairDetailsArray.length;i++)
    {
        var repairDetail = repairDetailsArray[i];
        total += repairDetail.avancement;
    }

    if(repairDetailsArray.length > 0){
        return total/repairDetailsArray.length;
    }

    return total;
    
}

const getDurationTotal = async (repairDetailsArray) => {
    var total = 0;

    for(let i = 0;i<repairDetailsArray.length;i++)
    {
        var repairDetail = repairDetailsArray[i];
        var durationInDays = ((repairDetail.dateFin - repairDetail.dateDebut) / (1000*60*60*24));
        total += durationInDays;
    }

    return total;
}

const getMontantPaidByReparation = async (reparationObject) => {
    var total = 0;
    const paym = await Payment.find({ reparation : reparationObject._id, valide: 1});

    if(paym.length == 0)
    {
        return 0;
    }

    for(let i = 0;i<paym.length;i++)
    {
        total += paym[i].montant;
    }
    return total;
}


module.exports = {
    getMontantTotalReparation,
    getAvgAvancement,
    getDurationTotal,
    getMontantPaidByReparation
};