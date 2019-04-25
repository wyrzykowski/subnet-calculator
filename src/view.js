let $ = require('jquery')  // jQuery now loaded and assigned to $
const {getVersion,getIpAddressBinary,getCardAddress,calcAll,getResult,clearResult,saveData} = require('./subnetCalc/index');
let count = 0;


const getCardAddressBtnInput = document.getElementById("getCardAddressBtnInput");
getCardAddressBtnInput.onclick=()=>{
    const input = document.getElementById("input");

    console.log(input.value);
    clearResult();
    calcAll(input.value);
    showResult();
};


function showResult(){
    console.log("POKAZUJE");
    const res =  getResult();
    const result = document.getElementById("result");
    let resultStringHTML="<div class='result'> <h2>Result</h2>";

    res.forEach(el=>{
        resultStringHTML += `<h5> ${el}</h5>`;
    });
    resultStringHTML+="</div>"
    resultStringHTML=resultStringHTML.replace(/,/gi,".");
    result.innerHTML=resultStringHTML;

    const saveToFile = document.getElementById("saveToFile");
    saveToFile.style="display:block";
    saveToFile.onclick=()=>{
        saveData();
        alert("saved successful!");
    }



}



$('#getCardAddressBtn').on('click', () => {

    const $cards = document.getElementById("cards");
    $cards.innerHTML="";
    const cards = getCardAddress();
    let stringCardsBtn="";
    const cardsBtns = cards.forEach((el,index)=>{
        var btn = document.createElement("button");
        btn.innerHTML=el;
        btn.classList.add("btn");
        btn.classList.add("btn-primary");
        btn.classList.add("mt-2");
        btn.classList.add("mr-2");


        btn.setAttribute('id', `card-${index}`);
        $cards.appendChild(btn);
});

const card0 = document.getElementById("card-0");
const card1 = document.getElementById("card-1");
const card2 = document.getElementById("card-2");



    card0.onclick=()=>{
        clearResult();
        calcAll(cards[0]);
        showResult();
    }

    card1.onclick=()=>{
        clearResult();
        calcAll(cards[1]);
        showResult();
    }

    card2.onclick=()=>{
        clearResult();
        calcAll(cards[2]);
        showResult();
    }

});



