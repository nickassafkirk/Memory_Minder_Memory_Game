//on page load -> generate game board;

//start button initiates game and starts counter
//initiates game start on button press
document.getElementById("startGame").addEventListener("click", startGame);

//end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);


//createRandom number function
//creates random number which will later be assigned an icon

//icon assign funtion -> replaces random numbers with icon pairs
//when icon assigned, tile is also assigned an attribute

//showTiles -> function which listens for click event and displays tile value on click

//match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
//if match icons remain displayed and correctly guessed tiles become disabled. 

//countCorrectAnswers -> count the number of tiles with value correct. each time a pair of tiles are matched, add 1 to the coundCorrectAnswers value;

//completeGAme -> When the number of correct answers == the number of cells the game can end.

//countClicks -> calculates number of user clicks -> needed to calculate score

//Timer Function -> starts timer when game is started end when game is complete or game is cancelled.

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game completion. 

//refresh/reset -> click button, invokes endGame() the reset tiles values, and return their default styling.

//additional levels of difficulty
//1. generateRandomColor -> generates a random background color, to make matching harder as game progresses
//2. addAdditional tiles -> 12, 16, 20, 24
//3. Reduce time -> decrease amount of time available to complete the game. 
//4. change icons to a math problem to be matched to the correct answer;

//additional iterations/Future development
// publish leaderboard;
//use api to generate random icon or picture


