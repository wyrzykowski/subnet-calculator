const fs = require('fs');

module.exports.saveToFile=(dataToSave)=>{
    //prepare better read data
    var dataToSaveString="";
    dataToSave.forEach(el=>{
         dataToSaveString+= el+ "\r\n";
    });
    dataToSaveString = dataToSaveString.replace(/,/gi,".");

    fs.writeFile("subnetCalculatorData.txt", dataToSaveString, function(err) {
        if(err) {
            throw ("cant write data to File");
        }
        console.log("The file was saved!");
    });
};