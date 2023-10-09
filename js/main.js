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

}

//shows the final score
function showScore(){

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