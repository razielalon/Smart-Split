
/* var name =prompt ("what is your name?");
var loc = window.location;
document.write("hey "+name); */

function check(){
    var email1 = document.getElementById("email");
    var email2 = document.getElementById("re-email");
    if(email1.value != email2.value){
        alert("emails must mutch");
        document.getElementById("re-email").className = "err";
        return false;
    }
    else{
        document.getElementById("re-email").className = "correct";
        return true;
    }
}

function changeBack(checked){
    checked.checked = true;
    if(checked.id == "male"){
        document.getElementById("main").style.backgroundColor = "#7db9e5";
    }
    else if(checked.id == "female"){
        document.getElementById("main").style.backgroundColor = "#d39eef";
    }
}




