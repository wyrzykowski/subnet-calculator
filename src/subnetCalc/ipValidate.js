module.exports.ipValidate=(address)=>{
    let valid =1;//valid
    try {
        address.map(octet => {
            console.log(octet)
            if (octet < 0 || octet > 255 || isNaN(octet)) valid = 0;
        });
    }catch(e){

    }
    return valid;
};