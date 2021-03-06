/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// Call the init function to start the game
init();

// This is what we want to happen every time we roll the dice
document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying){
        // 1) Random number
        var dice = Math.floor(Math.random() * 6) + 1;       // A random number from 1 to 6.

        // 2) Display the result
        var diceDOM =  document.querySelector(".dice");  // Create a variable to represent the .dice class, which is the image of the dice.
        diceDOM.style.display = "block";                 // Make the dice appear
        diceDOM.src = "dice-" + dice + ".png";           // Make a random image appear

        // 3) Update the round score if the rolled number wasn't a 1
        if(dice !== 1){
            roundScore += dice; // Add the random number generated by the dice to the roundScore variable
            document.querySelector("#current-" + activePlayer).textContent = roundScore; // Display the roundScore in the current-score div.
        } else {
            nextPlayer();
        }
    } 
});

// This is what we want to happen every time we hold

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        // 1) Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;   // The [activePlayer] works as a way to select the player 0 or 1, remember that scores is an arrray.

        // 2) Update the UI to reflect the changes in the global score
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // 3) Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector("#name-" + activePlayer).textContent = "Winner!"; // Display "Winner" instead of "Player 1/2"
            document.querySelector(".dice").style.display = "none";                  // Make the dice disappear
            document.querySelector(".player-" + activePlayer +"-panel").classList.add("winner");  // Add the "winner" class to the winner
            document.querySelector(".player-" + activePlayer +"-panel").classList.remove("active");  // Remove the "active" class
            gamePlaying = false;
        } else {
            // 4) Next player
            nextPlayer();
        }
    }
});

function nextPlayer (){
    // CHANGE THE ACTIVE PLAYER
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  // Is the active player 0? if so, make it 1, otherwise keep it as 0.
    // Reset the roundScore
    roundScore = 0;

    // Remove the current points
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    // Add the gray background and higher font weight to the active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // Hide the dice when a turn ends
    document.querySelector(".dice").style.display = "none";
}

// NEW GAME Event Listener
document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    // 1) Reset player scores
    scores = [0, 0];

    // 2) Make 0 the active player (that's the player that starts)
    activePlayer = 0;

    // 3) Reset the roundScore and set the gamePlaying to true
    roundScore = 0;
    gamePlaying = true;

    // 4)  Hide the dice when we enter the game
    document.querySelector(".dice").style.display = "none";

    // 5) Make the score points and current points 0
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    // 6) Change the "winner" text
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    // 7) Remove the winner class
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    // Remove the active player and add it again to player 0
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}



//document.querySelector("#current-" + activePlayer).textContent = dice;   
// If activePlayer is 0, then current will be #current-0, and if activePlayer is 1, current will be #current-1. 
// That's useful because in our html we have both current-0 and current-1 as IDs;