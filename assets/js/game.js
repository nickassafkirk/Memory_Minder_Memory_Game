//global variables


//on page load -> generate game board;

//start button initiates game and starts counter
//initiates game start on button press
document.getElementById("startGame").addEventListener("click", startGame);

function startGame(){
    setRandomTileOrder();
    startTimer();  
}

//end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

function endGame(){
    function endTimer(){
        clearInterval(timer);
    }
    endTimer();  
}
//createRandom number function
//creates random number which will later be assigned an icon
//creates an array of 12 random numbers
function setRandomTileOrder(){  
    while(array.length < 12){
        let randomNum = Math.random();
        randomNum = randomNum * 11;
        randomNum = Math.round(randomNum)+1;

        if(array.includes(randomNum)){
            continue;
        } else {
            array.push(randomNum);     
        }
    }
    console.log(array);
}
//icon assign function -> replaces random numbers with icon pairs
//when icon assigned, tile is also assigned an attribute
//icon variables
let football = `<i class="fas fa-football-ball"></i>`;
let mask = `<i class="fas fa-ufo"></i>`;
let poop = `<i class="fas fa-poop"></i>`;
let lightning = `<i class="far fa-bolt"></i>`;
let bulb = `<i class="fal fa-lightbulb"></i>`;
let rocket =`<i class="fas fa-rocket"></i>`;
let bacteria = `<i class="fas fa-bacterium"></i>`;
let kiwi = `<i class="fas fa-kiwi-bird"></i>`;
let cocktail = `<i class="fas fa-cocktail"></i>`;

//displayTile -> function which listens for click event and displays tile value on click
let tiles = document.querySelectorAll(".gametile");
tiles.forEach(tile => tile.addEventListener("click", displayTile));

let array = [];
let i = 0;

function displayTile(){
    //reveal tile by changing bg color and changing font-size from 0 to 3em;

    this.style.fontSize = "3em"
    this.style.backgroundColor = "red"/*generateRGBVal()*/;
    this.innerHTML = array[i];
    i++;

    //replace numerical valkues with icon pairs
    if(this.innerHTML < 3){
        this.innerHTML = rocket;
    } else if (this.innerHTML < 5){
        this.innerHTML = bacteria;
    } else if (this.innerHTML < 7){
        this.innerHTML = cocktail;
    } else if (this.innerHTML < 9){
        this.innerHTML = football;
    } else if(this.innerHTML < 11){
        this.innerHTML = poop;
    } else if(this.innerHTML < 13){
        this.innerHTML = kiwi;
    } else {
        console.log("Error: too many tiles");
    }
    // this counts number of clicks
    clicks = [i];
    document.getElementById("clicks").firstChild.innerHTML = clicks;
};

//match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
//if match icons remain displayed and correctly guessed tiles become disabled. 

//countCorrectAnswers -> count the number of tiles with value correct. each time a pair of tiles are matched, add 1 to the coundCorrectAnswers value;

//completeGAme -> When the number of correct answers == the number of cells the game can end.

//countClicks -> calculates number of user clicks -> needed to calculate score

//Timer Function -> starts timer when game is started end when game is complete or game is cancelled.
let count;

function startTimer(){
   count = 60, timer = setInterval(function() {
       count = count--;
       document.getElementById("timer").firstChild.innerText = count--;

       //end timer when timer reaches -1, This displays 0.
       if(count === -1) {
           clearInterval(timer);
           document.getElementById("timer").firstChild.innerText = "Game Over";
       }
    }, 1000);
}

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game completion. 

//refresh/reset -> click button, invokes endGame() the reset tiles values, and return their default styling.

//additional levels of difficulty
//1. generateRandomColor -> generates a random background color, to make matching harder as game progresses
let newRGB;

function generateRGBVal() {

    function generateRandomColor() {
        let r = Math.random();
        r = r * 255;
        r = Math.round(r);
        return r;
    }

    let rgbValue = [];
    for (let i = 0; i <= 2; i++) {
        let singleVal = generateRandomColor();
        rgbValue.push(singleVal);
    }
    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    return newRGB;
}
//2. addAdditional tiles -> 12, 16, 20, 24
//3. Reduce time -> decrease amount of time available to complete the game. 
//4. change icons to a math problem to be matched to the correct answer;

//additional iterations/Future development
// publish leaderboard;
//use api to generate random icon or picture


