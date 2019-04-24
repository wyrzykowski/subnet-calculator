
const sys = require('sys');
var os =require('os');
var exec = require('child_process').exec;

module.exports.pingHost=(hostArray)=>{
    var host="";
    hostArray.forEach((el,index)=>{
        if(hostArray.length===index+1)  host+=el;
        else host+=el+".";
    })
    console.log(host);
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("ping "+host, puts);
}