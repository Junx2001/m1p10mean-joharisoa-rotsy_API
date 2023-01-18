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


module.exports = {
    getMontantTotalReparation,
    getAvgAvancement,
};