const {addressToDecimal} = require( "./addressToDecimal");
const {ipValidate} = require("./ipValidate");
var validateIP = require('validate-ip-node');

module.exports.validateIpAddress=(ipAndMaskString)=> {

    try { //recognize if schema: ip/mask
        var ipTemp = ipAndMaskString.split('/');
    } catch (err) {
        throw("Invalid Ip adress or mask!")
    }

    if (ipTemp.length > 2) throw("Invalid Ip adress!");
   if(ipTemp[1]>32) throw("Invalid subnet mask!");
   var subnetMask;
    try {
        var ipAddress = ipTemp[0].split('.');
        ipAddress.map((item,index)=>{
            ipAddress[index]=parseInt(item); //get ip address in array form
        })
    } catch (err) {
        throw("Invalid Ip adress!");
    }
    if (!ipValidate(ipAddress)) throw("Invalid Ip adress!");

    if(ipTemp[1].length<=2) {
//get mask Array from shortForm
        let netMaskArray = [];
        let netMaskString ='';

        for(let i=0;i<32;i++){
            if(i<=ipTemp[1]-1) {
                netMaskString += '1';
            }
            else netMaskString += '0';
                if (i  === 7 || i === 15 || i ===23 || i===31) {
                    netMaskArray.push(netMaskString);
                    netMaskString = "";
                }
        }
      subnetMask= addressToDecimal(netMaskArray);
    }
    else{ //If submet id given in array form
        subnetMask = ipTemp[1].split('.');
        subnetMask = subnetMask.map(el=>{
            return parseInt(el);
        })
    }

   if (!ipValidate(subnetMask)) throw("Invalid Ip address!")

    console.log("SUBNET MASK",subnetMask,"IP",ipAddress)
    return {ipAddress, subnetMask}
};