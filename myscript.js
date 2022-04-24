
/* var name =prompt ("what is your name?");
var loc = window.location;
document.write("hey "+name); */


function MainButton_onclick(element){
    x = document.getElementById('testP1');

    if(element.id == "button1"){
        x.innerHTML = "the first button has been pressed";
    }

    else if(element.id == "button2"){
        x.innerHTML = "the second button has been pressed";
    }

    else if(element.id == "button3"){
        x.innerHTML = "this is the original paragraph";
    }
    
    else{
        x.innerHTML = "error";
    }
}

