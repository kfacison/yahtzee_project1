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
    //checks for possiable score of 3 and 4 of a kind
    diceSameValue(3);
    diceSameValue(4);
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

function maxAppers(givenMaxCounter){
    let maxValue = 0;
    for(let i=1;i<7;i++){
        let maxCounter;
        if(givenMaxCounter === undefined){
        maxCounter =0;
        }
        else{
            maxCounter = givenMaxCounter
        }
        let tempCounter;
        for(let j=0;j<5;j++){
            if(cupOfDice[j].value===i){
                tempCounter++;
            }
        }
        if(tempCounter>maxCounter){
            maxCounter = tempCounter;
            maxValue = i;
        }
    }
    return maxValue;
}

function diceSameValue(numberOfDice, desiredNum){
    let diceCounter =0;
    let tempScore = 0;
    for(let i=0;i<5;i++){
        if(cupOfDice[i].value === desiredNum){
            diceCounter++
            tempScore += desiredNum;
        }
    }
    let possibleScore = document.querySelector(`label[for="${desiredNum}OfAKind"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else{
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
}

function test(){
    rollAllDice();
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