function home(){
    document.getElementById("main").style.backgroundColor = "#ffffff";
}

function countinpN(){
    var inps = document.getElementsByClassName("MainInputs");
    return(inps.length);
}

function countinpP(){
    var inps = document.getElementsByClassName("MainInputs1");
    return(inps.length);
}

function AddName1(){

    //creating a name input
    var inp = document.createElement("input");
    inp.className = "MainInputs";
    inp.setAttribute('required', '');
    inp.id = ("name"+(countinpN()+1));
    inp.placeholder = ("Name "+(countinpN()+1));
    var indiv = document.getElementById("inputsDiv");
    indiv.appendChild(inp);

    //creating a pay input
    var payInp = document.createElement("input");
    payInp.className = "MainInputs1";
    payInp.id = ("pay"+(countinpN()));
    payInp.setAttribute('required', '');
    payInp.placeholder = ("Payment "+(countinpN()));
    payInp.type = "number";
    var PayInDiv = document.getElementById("InputsDiv2");
    PayInDiv.appendChild(payInp);
    
}
function valArr(pays){
    var arr = [];
    for(i=0;i<pays.length;i++){
        arr.push(pays[i].value);
    }
    return arr;
}

function printarr(arr){
    
    for(i=0;i<arr.length;i++){
        console.log(arr[i]);
    }
}

function sumArr(arr){
    var sum = 0;
    for(i=0;i<arr.length;i++){
        sum += Number(arr[i]);
    }
    return sum;
}

function CreateFirstArr(namesVal,paysVal){
    var arr = [];
    for(i=0;i<namesVal.length;i++){
        arr.push([ namesVal[i] , paysVal[i] ]);
    }
    return arr;

}

function createGets(people,each){
    var arr = [];
    for(i=0;i<people.length;i++){
        if((each - Number(people[i][1]) ) < 0){
            arr.push([ people[i][0] , (each - Number(people[i][1]))*(-1) ])
        }
    }
    return arr;
}

function createOwes(people,each){
    var arr = [];
    for(i=0;i<people.length;i++){
        if((each - Number(people[i][1]) ) > 0){
            arr.push([ people[i][0] , each - Number(people[i][1]) ])
        }
    }
    return arr;
}

function LogTransaction(bestpos,owes,i,gets,sum){
    var trans;
    trans = [ owes[bestpos][0] , gets[i][0] , sum ];//record from who, to who, how much.
    return trans;
}

function biggestOwes(owes){
    var biggest = 0;
    for (i=0;i<owes.length;i++){
        if(owes[i][1]>biggest){
            biggest = owes[i][1];
        }
    }
    return biggest;
}

function theBestClose(get1,owes){ //gets one get and all the owes, returns the best owe for the trans and it pos inside the arrey

    var after = 0;
    var myAfter;
    var theBest;
    var pos;
    

    for(i=0;i<owes.length;i++){
        myAfter = owes[i][1]-get1[1];
        if(i==0){ //am i the first?
            after = myAfter;
            theBest = owes[i];
            pos = i;
        }
        else{ // i am not the first
            if(myAfter<0){ // cant i close the get?
                if(after<0){ //the previos one also cant?
                    if(myAfter>after){ //am i a less shit trans the the previos?
                      after = myAfter;
                      theBest = owes[i];
                      pos = i;
                    }
                }
            }
            else if(myAfter ==0){ // am i the perfect match?
                theBest = owes[i];
                after = myAfter;
                pos = i;
                return pos;
            }
            else if(myAfter>0){ //can i close the debt and still will have money?
                if(after>0){ //the previos after is also bigger then 0? can he also close the debt?
                    if(myAfter<after){
                        theBest = owes[i];
                        after = myAfter;
                        pos = i;
                    }
                }
                else{ //the previos one cant close the debt and i can
                    theBest = owes[i];
                    after = myAfter;
                    pos = i;
                }
            }
        }
    }
    return pos
}

function split(){
    console.log("entered");

    var numOfP = countinpN();
    var pays = document.getElementsByClassName("MainInputs1");
    var names = document.getElementsByClassName("MainInputs");

    var paysVal = valArr(pays); //an arr with the payments values
    var namesVal = valArr(names); //an arr with the names values

    var people = CreateFirstArr(namesVal,paysVal); //an arr with arrs of people info
    var each = (sumArr(paysVal)/numOfP); //how much each needs to pay
    var gets = createGets(people,each); //creates the gets arrey
    var owes = createOwes(people,each); //creates the owes arrey

    
    var bestpos;
    var sum;
    var currentGet;
    var currentOwe;
    var transaction = [];
    

    for (j=0;j<gets.length;j++){
       

        while(gets[j][1]>1){ // while i am not finished

            bestpos = theBestClose(gets[j],owes);
            
            currentGet = gets[j][1];
            currentOwe = owes[bestpos][1];
            

            if(owes[bestpos][1]>=gets[j][1]){ //if the best owe can cover the debt
                sum = gets[j][1];
                transaction.push(LogTransaction(bestpos,owes,j,gets,sum));
                gets[j][1] = 0;
                owes[bestpos][1] = owes[bestpos][1] - currentGet;
            }
            else if(owes[bestpos][1]<gets[j][1]){ //if the best owe cant cover the debt
                sum = owes[bestpos][1];
                transaction.push(LogTransaction(bestpos,owes,j,gets,sum));
                owes[bestpos][1] = 0;
                gets[j][1] = gets[j][1] - currentOwe;   
            }

        }
    }

    /* prints the transaction to console */
    for(h=0;h<transaction.length;h++){
        var para = document.createElement("p");
        var node = document.createTextNode(transaction[h][0] + "  TO  " + transaction[h][1]+ "  SUM OF  " + transaction[h][2]);
        para.appendChild(node);
        para.className = "par";
        var element = document.getElementById("transDiv");
        element.appendChild(para);
        element.style.display = "block";
        console.log( transaction[h][0] + " " + transaction[h][1]+ " " + transaction[h][2] );
    }
 
}