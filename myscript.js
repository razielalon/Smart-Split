
/* var name =prompt ("what is your name?");
var loc = window.location;
document.write("hey "+name); */

function home(){
    document.getElementById("main").style.backgroundColor = "#ffffff";
}

function countinp(){
    var inps = document.getElementsByClassName("MainInputs");
    return(inps.length);
}

function AddName1(){
    
    var inp = document.createElement("input");
    inp.className = "MainInputs";
    inp.placeholder = ("Name "+(countinp()+1));
    var indiv = document.getElementById("inputsDiv");
    indiv.appendChild(inp);

    var payInp = document.createElement("input");
    payInp.className = "MainInputs1";
    payInp.placeholder = ("Payment "+(countinp()));
    payInp.type = "number";
    var PayInDiv = document.getElementById("InputsDiv2");
    PayInDiv.appendChild(payInp);
    console.log(countinp());
    
}



