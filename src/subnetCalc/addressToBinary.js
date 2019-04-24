module.exports.addressToBinary=(address)=>{
    const binaryAddress = address.map(element=>{
        return ("00000000"+element.toString(2)).substr(-8);
    });
    return binaryAddress;
};