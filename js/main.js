/*----- constants -----*/
class Dice{
    value = 0
    roll = function(){this.value = Math.floor(Math.random() * 6) + 1;}
}
const dice1 = new Dice;
const dice2 = new Dice;
const dice3 = new Dice;
const dice4 = new Dice;
const dice5 = new Dice;
const cupOfDice =[dice1,dice2,dice3,dice4,dice5];



/*----- state variables -----*/


/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/

function rollAllDice(){
    cupOfDice.forEach(dice => {dice.roll()});
}

//pass index of cupOfDice to reroll
function reroll(...diceToReroll){
    diceToReroll.forEach(diceIdx => {cupOfDice[diceIdx].roll();});
}

//clears score and everything
function init(){
    rollAllDice();
    render();
}

//updates dice and score card
function render(){
    renderDice()
    renderScoreCard()
}

//itterratr through dice array update based on dice.value
function renderDice(){
    for(let i=1;i<6;i++){
        let tempDice;
        tempDice = document.querySelector(("span.value"+i));
        tempDice.innerText = cupOfDice[i-1].value;
    }

}

//update scorecard
function renderScoreCard(){
    //check for posiable scores of 1s-6s
    for(let i=1;i<7;i++){
        diceHasNum(i);
    }
    //checks for posibale score of chance
    diceSum();
    //checks for possiable score of 3/4/5 of a kind
    threeSame();
    fourSame();
    yahtzeeSame();
}

//shows the final score
function showScore(){
}

function diceHasNum(desiredNum){
    let tempScore =0;
    for(let i=0;i<5;i++){
        if(cupOfDice[i].value === desiredNum){
            tempScore += desiredNum;
        }
    }
    let possibleScore = document.querySelector(`label[for="${desiredNum}s"] span`);
    if(possibleScore.className === "picked"){return;}
    if(tempScore===0){
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
    else{
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
}
function diceSum(){
    let tempScore = 0;
    for(let i=0;i<5;i++){
            tempScore += cupOfDice[i].value;
    }
    let possibleScore = document.querySelector(`label[for="chance"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else{
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
}

function maxAppers(givenMaxCounter=0){
    let maxValue = 0;
    for(let i=1;i<7;i++){
        let maxCounter = givenMaxCounter;
        let tempCounter = 0;
        for(let j=0;j<5;j++){
            if(cupOfDice[j].value===i){
                tempCounter++;
            }
        }
        //console.log(`counted ${i} a total of ${tempCounter} times`);
        if(tempCounter>=maxCounter){
            return true;
        }
    }
    //console.log(`the value that appers ${givenMaxCounter} time  is ${maxValue}`);
    //return maxValue;
    return false;
}

function threeSame(){
    
    let possibleScore = document.querySelector(`label[for="3OfAKind"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else if(maxAppers(3)){
        let tempScore = 0;
        for(let i=0;i<5;i++){
                tempScore += cupOfDice[i].value;
        }
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
}

function fourSame(){
    
    let possibleScore = document.querySelector(`label[for="4OfAKind"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else if(maxAppers(4)){
        let tempScore = 0;
        for(let i=0;i<5;i++){
                tempScore += cupOfDice[i].value;
        }
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
}

function yahtzeeSame(){
    
    let possibleScore = document.querySelector(`label[for="YAHTZEE"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else if(maxAppers(5)){
        possibleScore.innerText = 60;
        possibleScore.setAttribute("class","p");
    }
}

function test(){
    dice1.value=3;
    dice2.value=1;
    dice3.value=3;
    dice4.value=3;
    dice5.value=3;
    renderDice();
    renderScoreCard();
}

function turn(){
    let turnCounter =0;
    while(turnCounter<13){
        rollAllDice();
        render();
        //if there is no score change then reroll (max of 2 rerolls)
        turnCounter++;
    }
    showScore();
}