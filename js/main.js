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
let numOfRerolls = 2;
let hasLockedIn = false;
let numOfTurns = 1;
let scoreCard = {};
let allSelected = false;

/*----- cached elements  -----*/
const rerollButton = document.getElementById("rerollButton");
const lockInButton = document.getElementById("lockIn");
const replayButton =document.getElementById("replay");
const selectAllButton = document.getElementById("selectAll");

/*----- event listeners -----*/
rerollButton.addEventListener("click", rerollSelected);
lockInButton.addEventListener("click",lockInScore);
replayButton.addEventListener("click", playAgin);
selectAllButton.addEventListener("click",selectAll);

/*----- functions -----*/
function rerollSelected(){
    if(numOfRerolls===0){return;}
    let numsToReroll = [];
    for(let i =1;i<6;i++){
        const isCheckboxes = document.getElementById(`diceReroll${i}`).checked;
        if(isCheckboxes){
            numsToReroll.push(i);
        }
    }
    if(numsToReroll.length===0){return}
    reroll(numsToReroll);
    numOfRerolls--;
    renderReroll();
    const diceCheckbox = document.querySelectorAll("input");
    for(let i=0;i<diceCheckbox.length;i++){
        diceCheckbox[i].checked =false;
    }
}

function lockInScore(evt){
    evt.preventDefault();
    const isSelcted = document.querySelector("input[name=points]:checked");
    if(isSelcted === null){return;}
    if(!scoreCard[isSelcted.id]){
        scoreCard[isSelcted.id] = document.querySelector(`label[for="${isSelcted.id}"] span`).innerText;
        document.querySelector(`label[for="${isSelcted.id}"] span`).setAttribute("class", "picked");
        isSelcted.style.visibility = "hidden"
        hasLockedIn = true;
        numOfTurns++;
        numOfRerolls =2;
        rollAllDice();
        const diceCheckbox = document.querySelectorAll("input");
        for(let i=0;i<diceCheckbox.length;i++){
            diceCheckbox[i].checked =false;
        }
    }

}

function selectAll(){
    const diceCheckbox = document.querySelectorAll("#diceMat input");
    if(allSelected === false){
        for(let i=0;i<diceCheckbox.length;i++){
                diceCheckbox[i].checked =false;
        }
        allSelected = true;
    }
    else if(allSelected === true){
        for(let i=0;i<diceCheckbox.length;i++){
                diceCheckbox[i].checked =true;
        }
        allSelected = false;
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
    numOfRerolls = 2;
    hasLockedIn = false;
    allSelected = false;
    numOfTurns = 1;
    scoreCard = {};
    replayButton.style.visibility = "hidden";
    const diceCheckbox = document.querySelectorAll("input");
        for(let i=0;i<diceCheckbox.length;i++){
            diceCheckbox[i].checked =false;
        }
}

//updates dice and score card
function render(){
    renderDice()
    renderScoreCard()
    renderScore();
    renderReroll();
}

//itterratr through dice array update based on dice.value
function renderDice(){
    for(let i=1;i<6;i++){
        let tempDice;
        tempDice = document.querySelector(("span.value"+i));
        tempDice.innerText = cupOfDice[i-1].value;
    }
    allSelected = false;
    selectAll();
}

//render nums of reroll
function renderReroll(){
    let rrIndicator = document.getElementById("rrNum");
    rrIndicator.innerText= numOfRerolls;
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

function setScore(scoreInfo , tempScore){
    scoreInfo.innerText = tempScore;
    scoreInfo.setAttribute("class","p");
}

function removeClass(scoreInfo){
    scoreInfo.innerText = 0;
    scoreInfo.removeAttribute("class");
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
        //possibleScore.innerText = 0;
        //possibleScore.removeAttribute("class");
        removeClass(possibleScore);
    }
    else{
        //possibleScore.innerText = tempScore;
        //possibleScore.setAttribute("class","p");
        setScore(possibleScore,tempScore);
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
        // possibleScore.innerText = tempScore;
        // possibleScore.setAttribute("class","p");
        setScore(possibleScore,tempScore);
    }
    else{
        // possibleScore.innerText = 0;
        // possibleScore.removeAttribute("class");
        removeClass(possibleScore);
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
        // possibleScore.innerText = tempScore;
        // possibleScore.setAttribute("class","p");
        setScore(possibleScore,tempScore);
    }
    else{
        // possibleScore.innerText = 0;
        // possibleScore.removeAttribute("class");
        removeClass(possibleScore);
    }
}

function countDuplicates(){
    let tempArray =[];
    for(let i =0;i<cupOfDice.length;i++){
        tempArray.push(cupOfDice[i].value);
    }
    let noDupArrays = tempArray.reduce((newObj,diceVal) =>{
        if(!newObj[diceVal]){
            newObj[diceVal] = 1;
        }
        else{
            newObj[diceVal] += 1;
        }
        return newObj;
    },{});
    let finalTemp = Object.values(noDupArrays);
    finalTemp.sort();
    if(finalTemp[0]===2 && finalTemp[1]===3){
        return true;
    }
    else{
        return false;
    }
}

function fullHouse(){
    let possibleScore = document.querySelector(`label[for="fullHouse"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    if(countDuplicates()){
        // possibleScore.innerText = 25;
        // possibleScore.setAttribute("class","p");
        setScore(possibleScore,25);
    }
    else{
        //possibleScore.innerText = 0;
        //possibleScore.removeAttribute("class");
        removeClass(possibleScore);
    }
}

function consecutiveNums(desiredConsecutiveNums){
    let tempArrayOfDice = cupOfDice.toSorted((diceA,diceB)=>{
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
    if(consecutiveNums(3)){
        // possibleScore.innerText = 30;
        // possibleScore.setAttribute("class","p");
        setScore(possibleScore,30);
    }
    else{
        //possibleScore.innerText = 0;
        //possibleScore.removeAttribute("class");
        removeClass(possibleScore);
    }
}

function largeStraight(){
    let possibleScore = document.querySelector(`label[for="largeStraight"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    if(consecutiveNums(4)){
        // possibleScore.innerText = 40;
        // possibleScore.setAttribute("class","p");
        setScore(possibleScore,40);
    }
    else{
        //possibleScore.innerText = 0;
        //possibleScore.removeAttribute("class");
        removeClass(possibleScore);
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
        //possibleScore.innerText = tempScore;
        //possibleScore.setAttribute("class","p");
        setScore(possibleScore,tempScore);
    }
}

function yahtzeeSame(){
    
    let possibleScore = document.querySelector(`label[for="YAHTZEE"] span`);
    if(possibleScore.className === "picked"){
        return;
    }
    else if(maxAppers(5)){
        //possibleScore.innerText = 60;
        //possibleScore.setAttribute("class","p");
        setScore(possibleScore,60);
    }
}

function renderScore(){
    const scoreSum = Object.values(scoreCard).reduce((a, b) => parseInt(a,10) + parseInt(b,10), 0);
    const scoreOutput = document.getElementById("score")
    const turnOutput = document.getElementById("turn")
    scoreOutput.innerText = `Score: ${scoreSum}`
    if(numOfTurns===14){
        turnOutput.innerText = `GAME OVER`
        scoreOutput.style.color = "#0066D3";
        document.getElementById("playerInfo").setAttribute("class","gameOver");
        replayButton.style.visibility = "";
    }
    else{
        turnOutput.innerText = `Turn ${numOfTurns}`
    }
}

//shows the final score
function showScore(numOfTurns){
    if(numOfTurns === 14){
        const scoreSum = Object.values(scoreCard).reduce((a, b) => parseInt(a,10) + parseInt(b,10), 0);
        return scoreSum;
    }
}

function playAgin(){
    document.getElementById("turn").innerText ="Turn 1"
    document.getElementById("score").style.color = "black";
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("playerInfo").removeAttribute("class");
    let tempSpans = document.querySelectorAll("#scoreCard span");
    tempSpans.forEach((noode)=>{noode.removeAttribute("class")});
    let tempInputs = document.querySelectorAll("#scoreCard div input");
    tempInputs.forEach((noode)=>{noode.style.visibility = ""});
    init();
    rollAllDice();
}

function test(){
    dice1.value =6;
    dice2.value =6;
    dice3.value =6;
    dice4.value =6;
    dice5.value =5;
    render();
}

function gamePlayTest(){
    init();
    rollAllDice();
}

gamePlayTest();