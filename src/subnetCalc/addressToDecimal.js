module.exports.addressToDecimal=(address)=>{
    const decimalAddress = address.map(el=>{
        return parseInt(el,2);
    });
    return decimalAddress;
};