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

    return total/repairDetailsArray.length;
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


module.exports = {
    getMontantTotalReparation,
    getAvgAvancement,
    getDurationTotal
};