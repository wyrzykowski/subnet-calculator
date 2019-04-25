'use strict';
var os = require('os');
var ifaces = os.networkInterfaces();
var readlineSync = require("readline-sync");




module.exports.getAddressIpAndMask=()=>
{
    var ipAndMaskArray=[];
    var ipAndMaskArrayInterfaceName=[];
    var alias = 0;
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach((iface)=> {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            else {
                ipAndMaskArray.push(iface.address + '/' + iface.netmask);
                ipAndMaskArrayInterfaceName.push(alias + ': ' + ifname);
                alias++;
            }
        });
    });





    if(ipAndMaskArray.length===0) throw("No Network Interface found!");//If there is no Network interface throw error
    else if(ipAndMaskArray.length===1) return  ipAndMaskArray[0]; // If is just one Network Interface not show choose menu, just return value
    else{
        console.log("Choose Network Interface to calculate:")

       const findedCards =  ipAndMaskArray.map((element,index)=>{
            return ipAndMaskArrayInterfaceName[index],"IP: ", element;
        })
        // var choosed = readlineSync.question("");
        return findedCards;
    }
}