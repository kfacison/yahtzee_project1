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
const scoreCard = {}



/*----- state variables -----*/


/*----- cached elements  -----*/
const rerollButton = document.getElementById("rerollButton");
const lockInButton = document.getElementById("lockIn");

/*----- event listeners -----*/
rerollButton.addEventListener("click", rerollSelected);
lockInButton.addEventListener("click",lockInScore);

/*----- functions -----*/

function rerollSelected(){
    let numsToReroll = [];
    for(let i =1;i<6;i++){
        const isCheckboxes = document.getElementById(`diceReroll${i}`).checked;
        if(isCheckboxes){
            numsToReroll.push(i);
        }
    }
    reroll(numsToReroll);
}

function lockInScore(evt){
    evt.preventDefault();
    const isSelcted = document.querySelector("input[name=points]:checked");
    if(!scoreCard[isSelcted.id]){
        scoreCard[isSelcted.id] = document.querySelector(`label[for="${isSelcted.id}"] span`).innerText;
        document.querySelector(`label[for="${isSelcted.id}"] span`).setAttribute("class", "picked");
        isSelcted.style.visibility = "hidden"
    }
}

function rollAllDice(){
    cupOfDice.forEach(dice => {dice.roll()});
    render();
}

//pass index of cupOfDice to reroll
function reroll(diceToReroll){
    diceToReroll.forEach(diceIdx => {cupOfDice[diceIdx-1].roll()});
    render();
}

//clears score and everything
function init(){
    rollAllDice();
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
    //checks for possiable score of 3/4 of a kind
    threeSame();
    fourSame();
    //checks for posibale score of full house
    fullHouse();
    //checks for posibale score of small/large straights
    smallStraight();
    largeStraight();
    //checks for posibale score of chance
    chanceSum();
    //checks for posibale score of yahtzee
    yahtzeeSame();
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
        if(tempCounter>=maxCounter){
            return true;
        }
    }
    return false;
}

function threeSame(){
    let possibleScore = document.querySelector(`label[for="3OfAKind"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    if(maxAppers(3)){
        let tempScore = 0;
        for(let i=0;i<5;i++){
            tempScore += cupOfDice[i].value;
        }
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
    else{
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
}

function fourSame(){
    let possibleScore = document.querySelector(`label[for="4OfAKind"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    if(maxAppers(4)){
        let tempScore = 0;
        for(let i=0;i<5;i++){
            tempScore += cupOfDice[i].value;
        }
        possibleScore.innerText = tempScore;
        possibleScore.setAttribute("class","p");
    }
    else{
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
}

function fullHouse(){
    let possibleScore = document.querySelector(`label[for="fullHouse"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    if(maxAppers(2) && maxAppers(3)){
        possibleScore.innerText = 25;
        possibleScore.setAttribute("class","p");
    }
    else{
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
}

function consecutiveNums(desiredConsecutiveNums){
    let tempArrayOfDice = cupOfDice.sort((diceA,diceB)=>{
        if(diceA.value < diceB.value){
            return -1
        }
        else if(diceB.value < diceA.value){
            return 1;
        }
        else{
            return 0;
        }
    });
    //console.log(tempArrayOfDice);

    let counter =0;
    for(let i=1; i< tempArrayOfDice.length; i++){
        if (tempArrayOfDice[i].value === tempArrayOfDice[i-1].value+1){
            counter++
        }
    }
    if (counter===desiredConsecutiveNums){
        return true;
    }
    else{
        return false;
    }
}

function smallStraight(){
    let possibleScore = document.querySelector(`label[for="smallStraight"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    //temp boolean expression
    if(consecutiveNums(3)){
        possibleScore.innerText = 30;
        possibleScore.setAttribute("class","p");
    }
    else{
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
}

function largeStraight(){
    let possibleScore = document.querySelector(`label[for="largeStraight"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    //temp boolean expression
    if(consecutiveNums(4)){
        possibleScore.innerText = 40;
        possibleScore.setAttribute("class","p");
    }
    else{
        possibleScore.innerText = 0;
        possibleScore.removeAttribute("class");
    }
}

function chanceSum(){
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
    //rollAllDice();
    dice1.value=6;
    dice2.value=4;
    dice3.value=1;
    dice4.value=3;
    dice5.value=2;
    renderDice();
    renderScoreCard();
}

function test2(){
    //rollAllDice();
    dice1.value=5;
    dice2.value=4;
    dice3.value=1;
    dice4.value=3;
    dice5.value=2;
    renderDice();
    renderScoreCard();
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
