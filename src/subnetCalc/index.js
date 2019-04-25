'use strict';
const {pingHost} = require("./pingHost");
const {checkPrivate} = require("./checkPrivate");
const readline = require('readline-sync');
const {getAddressIpAndMask} = require('./getAddressIpAndMask');
const {validateIpAddress} = require('./validateIpAddress');
const yargs = require('yargs');
const {addressToDecimal} = require('./addressToDecimal');
const {addressToBinary} = require('./addressToBinary');
const {saveToFile} = require('./saveToFile');

var dataToSave=[];


module.exports.getCardAddress=()=>{
       return getAddressIpAndMask();
};






    // ipAndMaskString = "192.168.1.1/12";

module.exports.calcAll=(ipAndMaskString) =>{

    const {ipAddress,subnetMask} = validateIpAddress(ipAndMaskString);


    console.log("IpAddress & subnet mask:",ipAddress,subnetMask);

//Parse IP Array from decimal to binary
    var ipAddressBinary = [];
    var subnetMaskBinary = [];

    ipAddress.map((element,index) => {
        ipAddressBinary[index] = (("00000000" + element.toString(2)).substr(-8));
    });
    module.exports.getIpAddressBinary = () => {
        return ipAddress;
    }


    subnetMask.map((element,index) => {
        subnetMaskBinary[index] = (("00000000" + element.toString(2)).substr(-8));
    });


//Subnet mask to short
    var shortSubnetMask = 0;
    subnetMaskBinary.forEach((element,index) => {
        for (let i = 0; i < 8; i++) {
            const binar = Number(parseInt(subnetMaskBinary[index][i]));
            shortSubnetMask += binar;
        }
    });


    console.log("Short subnet mask: ",shortSubnetMask);
    const ipAddressString = "Binary Ip Addsress: " + ipAddressBinary + " " + " Binary subnet mask: " + subnetMaskBinary;
    console.log(ipAddressString);

    dataToSave.push(ipAddressString);

    var networkClassName = "";

//Check Network class
    if (ipAddressBinary[0].substring(0,1) === "0") networkClassName = "A";
    else if (ipAddressBinary[0].substring(0,2) === "10") networkClassName = "B";
    else if (ipAddressBinary[0].substring(0,3) === "110") networkClassName = "C";
    else if (ipAddressBinary[0].substring(0,4) === "1110") networkClassName = "D";
    else if (ipAddressBinary[0].substring(0,4) === "1111") networkClassName = "E";
    const networkClassString = "Network calss name:" + networkClassName;
    console.log(networkClassString);
    dataToSave.push(networkClassString);

    var networkIpAddress = new Array(4);
    ipAddressBinary.map((element,index) => {
        networkIpAddress[index] = "";
        for (let i = 0; i < 8; i++) {
            const binar = (element[i] & subnetMaskBinary[index][i]);
            networkIpAddress[index] += binar;
        }
    });
    const networkIpAddressDecimal = addressToDecimal(networkIpAddress);
    const networkIpAddressString = "network Ip Address binary: " + networkIpAddress + " network Ip Address decimal: " + networkIpAddressDecimal;
    console.log(networkIpAddressString);
    dataToSave.push(networkIpAddressString);

    const checkPrivateString = checkPrivate(ipAddress,networkClassName) ? "Private Address" : "Public Address" + " ";
    console.log(checkPrivateString);
    dataToSave.push(checkPrivateString);


//ADRES ROZGLOSZENIOWY
    var networkBroadcastAddress = new Array(4);
    var networkMaskNot = new Array(4);
    ipAddressBinary.forEach((element,index) => {
        networkMaskNot[index] = "";
        for (let i = 0; i < 8; i++) {
            const binar = Number(!parseInt(subnetMaskBinary[index][i]));
            networkMaskNot[index] += binar;
        }
    });
    const decimalNetworkMaskNot = addressToDecimal(networkMaskNot);

    networkBroadcastAddress = decimalNetworkMaskNot.map((element,index) => {
        return element + networkIpAddressDecimal[index];
    });

    const broadcastAddressString = "Network Broadcast Address: " + networkBroadcastAddress + " "
        + "Network Broadcast Address Binary: " + addressToBinary(networkBroadcastAddress);
    console.log(broadcastAddressString);
    dataToSave.push(broadcastAddressString);


//Max liczba hostów:
    const maxHostNumber = Math.pow(2,32 - shortSubnetMask) - 2;
    const maxHostNumberString = "Max host number: " + maxHostNumber;
    console.log(maxHostNumberString);
    dataToSave.push(maxHostNumberString);

    var firstHostAddress = [...networkIpAddressDecimal];
    firstHostAddress[3] += 1;
    const firstHostAddressString = "First host address: " + firstHostAddress;
    console.log(firstHostAddressString);
    dataToSave.push(firstHostAddressString);

    var lastHostAddress = [...networkBroadcastAddress];
    lastHostAddress[3] -= 1;
    const lastHostAddressString = "Last host address:" + lastHostAddress;
    console.log(lastHostAddressString);
    dataToSave.push(lastHostAddressString);


// if(ipAddress[0]>=firstHostAddress[0] && ipAddress[1]>=firstHostAddress[1]
//     && ipAddress[2]>=firstHostAddress[2] && ipAddress[3]>=firstHostAddress[3]
//     && ipAddress[0]<=lastHostAddress[0] && ipAddress[1]<=lastHostAddress[1]
//     && ipAddress[2]<=lastHostAddress[2] && ipAddress[3]<=lastHostAddress[3])
//     // var userPingAnswear = readline.question("Do you want to ping host?");
//     // if(userPingAnswear === "y")  pingHost(ipAddress);

}
    module.exports.getVersion=()=>{
        return 1;
    }
module.exports.getResult=()=>{
    return dataToSave;
}
module.exports.clearResult=()=>{
    dataToSave=[];
}


module.exports.saveData=()=> {
    saveToFile(dataToSave);
};












