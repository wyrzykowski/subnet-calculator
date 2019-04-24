module.exports.checkPrivate=(ip,addressClass)=>{
     switch(addressClass){
         case 'A':
             if(ip[0]===10 && ip[1]>=0 && ip[1]<=255 && ip[2]>=0 && ip[2]<=255 && ip[3]>=0 && ip[3]<=255) return 1;
             else return 0;
             break;

         case 'B':
             if(ip[0]===172 && ip[1]>=16 && ip[1]<=31 && ip[2]>=0 && ip[2]<=255 && ip[3]>=0 && ip[3]<=255) return 1;
             else return 0;
             break;

         case 'C':
             if(ip[0]===192 && ip[1]===168 && ip[2]>=0 && ip[2]<=255 && ip[3]>=0 && ip[3]<=255) return 1;
             else return 0;
             break;

         case 'D':
            return 0;
             break;
         case 'E':
            return 0;
             break;
         default: console.log("Wrong address class!");


    }

}