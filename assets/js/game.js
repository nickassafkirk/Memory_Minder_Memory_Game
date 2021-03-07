//on page load -> generate game board;
window.onload = function(){
    console.log("Page Loaded")
}

//global variable

let i = 0;
let clicks;
let timeScore;

/*start button initiates game and starts counter
initiates game start on button press*/
let startButton = document.getElementById("startGame")
startButton.addEventListener("click", startGame);

function startGame() {
    startButton.disabled = true;
    setRandomTileOrder();
    console.log(randomOrderArray);
    startTimer();
}

//end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);


function endGame() {
    function endTimer() {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    }
    randomOrderArray= [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}

/* createRandom number function
creates random number which will later be assigned an icon
creates an array of 12 random numbers*/
let randomOrderArray = [];
function setRandomTileOrder() {
    while (randomOrderArray.length < 12) {
        let randomNum = Math.random();
        randomNum = randomNum * 11;
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    }
}

//Timer Function -> starts timer when game is started end when game is complete or game is cancelled.
let count;

function startTimer() {
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 0, timer = setInterval(function () {
        count = count++;
        document.getElementById("timer").firstChild.innerText = count++;

        //end timer when timer reaches -1, This displays 0.
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}

/* icon assign function -> replaces random numbers with icon pairs
when icon assigned, tile is also assigned an attribute icon variables */
let football = `<i class="fas fa-football-ball"></i>`;
let mask = `<i class="fas fa-ufo"></i>`;
let poop = `<i class="fas fa-poop"></i>`;
let lightning = `<i class="far fa-bolt"></i>`;
let bulb = `<i class="fal fa-lightbulb"></i>`;
let rocket = `<i class="fas fa-rocket"></i>`;
let bacteria = `<i class="fas fa-bacterium"></i>`;
let kiwi = `<i class="fas fa-kiwi-bird"></i>`;
let cocktail = `<i class="fas fa-cocktail"></i>`;

//displayTile -> function which listens for click event and displays tile value on click
const tiles = document.querySelectorAll(".gametile");

const selectedTile = ''

tiles.forEach(tile => tile.addEventListener("click", displayTile));

function displayTile(e) {

    //reveal tile by changing bg color and changing font-size from 0 to 3em;
    if (this.getAttribute("state") != "selected") {
        this.style.fontSize = "3em"
        this.innerHTML = randomOrderArray[i];
        i++;

        //adds custom attr of state: selected to clicked tile
        this.setAttribute("state", "selected");
        let thisTileState = this.getAttribute("state");
    }
    else {
        console.log("heuston we have a problem");
    }

    //add unique bg color for each pair of tiles
    let colorArray = ["rgb(237, 21, 222)", "rgb(22, 206, 34)", "rgb(249, 129, 49)", "rgb(234, 212, 14)", "rgb(34, 244, 220)", "rgb(0, 65, 247)"];

    //replace numerical values with icon pairs

    if (this.innerHTML < 3) {
        this.innerHTML = rocket;
        this.setAttribute("icon", "rocket")
        this.style.backgroundColor = colorArray[0];
    } else if (this.innerHTML < 5) {
        this.innerHTML = bacteria;
        this.setAttribute("icon", "bacteria")
        this.style.backgroundColor = colorArray[1];
    } else if (this.innerHTML < 7) {
        this.innerHTML = cocktail;
        this.setAttribute("icon", "cocktail")
        this.style.backgroundColor = colorArray[2];
    } else if (this.innerHTML < 9) {
        this.innerHTML = football;
        this.setAttribute("icon", "football")
        this.style.backgroundColor = colorArray[3];
    } else if (this.innerHTML < 11) {
        this.innerHTML = poop;
        this.setAttribute("icon", "poop")
        this.style.backgroundColor = colorArray[4];
    } else if (this.innerHTML < 13) {
        this.innerHTML = kiwi;
        this.setAttribute("icon", "kiwi")
        this.style.backgroundColor = colorArray[5];
    } else {
        console.log("Error: too many tiles");
    }

    // logs the value of the tile's icon
    console.log(e.target.getAttribute("icon"));

    // this counts number of clicks
    countMoves()
    
};
    

    $(".gameTile").toggle();

//countClicks -> calculates number of user clicks -> needed to calculate score
function countMoves(){
    clicks = i;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

//ClearTiles -> Clear tiles when new game is started;
function clearTiles(){
    for(let n = 0; n < tiles.length; n++){
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
}

/*match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
if match icons remain displayed and correctly guessed tiles become disabled. */

//countCorrectAnswers -> count the number of tiles with value correct. each time a pair of tiles are matched, add 1 to the coundCorrectAnswers value;

//completeGAme -> When the number of correct answers == the number of cells the game can end.

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game completion. 
function calculateScore(){
    timeScore = parseInt(timeScore);
    let calculatedScore = (timeScore + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}
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


