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
console.log(cupOfDice);
