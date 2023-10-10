//Psudeo code

// Make dice class ✔
//variable - dice value
//function  - roll(rolls 1-6)

// Make 6 dice with dice class
//set to array

// Dice can be rerolled
//reroll button, reroll coresponding dice

// Roll 3 times total per turn
//reroll button stop woking/dissapre after 3 rolls total 
//turn ends after score button is hit

// 13 turns
//iterrate 13 times

// How to score points can be picked
//After rolling, possiable ways to score (text and button) become bold
//Player clicks button for how to score points
//points logged and way to score is removed

// Repeated tasks
//read through scoreCard
//check if dice value can score
//change possiable score display
//remove way to score

//make socreCard object, if value is empty score possiable

// Points are totaled
//Score is displayed

/*
init() - clears score and everything
turn(){
    rollAllDice() ✔ - rolls all the dice (itterratr through dice array)

    render() {
        renderDice() - itterratr through dice array
        renderScoreCard()
    }- updates dice and score card

    reroll(diceToReroll) ✔ x2{
        render()
    } - reroll selected dice(max of 2x)(itterratr through dice array)

} - all in one turn(do 13x)

showScore() - shows the final score
*/

//might be better to have rollAllDice() and reroll() renderDice() in the function
//(after main code is done exucuting)

//3 of a kind steps

/*
look through array for max number of dupicates
if number of duplicates is 3 then the sum is the possiable score
*/


/*
score card onject
key = way to score id (5s or 4OfAKind)
value = score
if key is not in object add to it
set span to class of picked
*/

//ugly code is ok
//get mvp done first THEN make it pretty.


//when roll button is clicked
//coraponding selected boxes info is passed to functio reroll.
//output selected boxes when roll is clicked

// found code on stack geeks for geeks and moded it for small and large stargight
//link: https://www.geeksforgeeks.org/check-if-array-elements-are-consecutive/#

//stectch goal 
//if sorce of 0 is selcted add a warning message


//code for sum of oject values from stack overflow
//link: https://stackoverflow.com/questions/16449295/how-to-sum-the-values-of-a-javascript-object#:~:text=It%20can%20be%20as%20simple,%3E%20a%20%2B%20b%2C%200)%3B
