//global variables
const endButtonRef = document.querySelector('#endGame')
const startButtonRef = document.querySelector("#startGame")
const tiles = document.querySelectorAll(".gametile");
let clicks = 0;
let correctMatches = 0;
let tileIcon;
let tileIcons = [];
let tileIds = [];
let n = 0;

const gameplayAreaRef = document.querySelector("#gameplay-area");
const scoreAreaRef = document.querySelector("#scoreboard");

const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;
const fire = `<i class="fas fa-fire-alt"></i>`;
const anchor = `<i class="fas fa-anchor"></i>`;
const iconsTheme =[football, pizza, rocket, bacteria, kiwi, cocktail, fire, anchor];

let numbersTheme =  [singleRGBValue(),singleRGBValue(),singleRGBValue(),singleRGBValue(),singleRGBValue(),singleRGBValue(),singleRGBValue(),singleRGBValue()];

//Event Listeners
startButtonRef.addEventListener("click", startGame);
endButtonRef.addEventListener("click", endGame);

function startGame() {
    endButtonRef.disabled = false;
    startButtonRef.disabled = true;
    resetTiles();
    startTimer();
    //displayTile -> function which listens for click event and displays tile value on click
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
}

function endGame() {
    endButtonRef.disabled = true;
    startButtonRef.innerText = "New Game";
    startButtonRef.disabled = false;
    calculateScore();
    showScoreOnCompletion()
}

/**
 * createRandom number function
 * creates random number which will later be assigned an icon
 * creates an array of random numbers which has a length which equals the number of tiles in the game
 */
function setRandomTileOrder(numberOfTiles) {
    if(isNaN(numberOfTiles)) return
        
    let randomOrderArray = [];
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random();
        randomNum = randomNum * (numberOfTiles - 1);
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    }
    setTiles(randomOrderArray, iconsTheme);
}

/**
 * This function assigns pairs of icons to the game tiles
 * it takes the parameter randomOrderArray which shuffles the tile order, creating a unique tile order
 * @param {array} randomOrderArray 
 */
function setTiles(randomOrderArray, tileThemeArray) {
    let bgColors = buildColorSelection(generateRandomColor);
    let i = 0;
    for (tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;
        //replace numerical values with icon pairs
        if (tile.innerText < 3) {
            assignTileInner(tileThemeArray, bgColors, 0)
        } else if (tile.innerHTML < 5) {
            assignTileInner(tileThemeArray, bgColors, 1)
        } else if (tile.innerHTML < 7) {
            assignTileInner(tileThemeArray, bgColors, 2)
        } else if (tile.innerHTML < 9) {
            assignTileInner(tileThemeArray, bgColors, 3)
        } else if (tile.innerHTML < 11) {
            assignTileInner(tileThemeArray, bgColors, 4)
        } else if (tile.innerHTML < 13) {
            assignTileInner(tileThemeArray, bgColors, 5)
        } else if (tile.innerHTML < 15) {
            assignTileInner(tileThemeArray, bgColors, 6)
        } else if (tile.innerHTML < 17) {
            assignTileInner(tileThemeArray, bgColors, 7)
        } else {
            console.log("Error: too many tiles");
        }
    }
}

/**
 * Sets the inner values and custom attribute for each tile pair
 * @param {Array} tileThemeArray 
 * @param {Array} bgColors 
 * @param {Number} num 
 */
function assignTileInner(tileThemeArray, bgColors, num){
    tile.innerHTML = tileThemeArray[num];
            tile.setAttribute("icon", tileThemeArray[num])
            tile.addEventListener("click", function(){
                this.style.backgroundColor = bgColors[num];
            });
}

/** 
 * starts timer when game is started end when game is complete or game is cancelled.
*/
function startTimer() {
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 1, timer = setInterval(function () {
        count = count++;
        document.getElementById("timer").firstChild.innerText = count++;

        //If time runs out, game is ended
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Time Up";
            endGame();
        }
    }, 1000);
}

function endTimer() {
        let timeScore = document.getElementById("timer").innerText;
        clearInterval(timer);
        return timeScore
    }

/** 
 * This function checks the tiles 
*/
function displayTile(e) {

    //reveal tile by changing bg color and changing font-size from 0 to 3em;
    this.classList.remove("hideTile");
    this.classList.add("displayTile");

    // logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    let tileId = e.target.getAttribute("id");
    //disable each guess from being reclicked
    document.getElementById(tileId).removeEventListener("click", displayTile);
    tileIds.push(tileId);
    
    if (tileIcons.length % 2 == 0) {
        checkMatch(tileIcons, tileIds, n)
        
        n = n + 2; 
        // this counts number of clicks
        countMoves()
    }
};


/**
 * checkMatch tests to see if first selection, matches second selection
 * @param {Array} tileIcons 
 * @param {Array} tileIds 
 * @param {Number} n 
 */
function checkMatch(tileIcons, tileIds, n) {
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "red";
        document.getElementById(tileIds[n]).style.backgroundColor = "red";
        //re-enable click event listener for tiles if match attempt is unsuccessful
        document.getElementById(tileIds[n + 1]).addEventListener("click", displayTile);
        document.getElementById(tileIds[n]).addEventListener("click", displayTile);
        setTimeout(function () {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
            document.getElementById(tileIds[n + 1]).removeAttribute("style");
            document.getElementById(tileIds[n]).removeAttribute("style");
        }, 1000);
    } else {
        console.log("match");
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct")
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct")
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
        correctAnswer()
        setTimeout(function () {
            let correctBg = generateRandomColor();
            document.getElementById(tileIds[n]).style.backgroundColor = correctBg;
            document.getElementById(tileIds[n + 1]).style.backgroundColor = correctBg;
        }, 1000);
    }
}

function correctAnswer() {
    correctMatches++;
    console.log(correctMatches);
    if (correctMatches === 8) {
        endGame();
    }
}
/**
 * calculates number of user clicks -> needed to calculate score
 */
function countMoves() {
    clicks++;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

/**
 * adds number of clicks and elapsed time to calculate score & displays score upon game completion
 */
function calculateScore() {
    let timeAtEnd = endTimer();
    timeScore = parseInt(timeAtEnd);
    let calculatedScore = (timeScore + (clicks +1));
    let resultType = isNaN(calculatedScore);
    
    if(resultType){
        document.querySelector("#score").firstChild.innerHTML = "Game Over";
        document.querySelector("#score").firstChild.style.color = "red";
    } else {
        document.querySelector("#score").firstChild.innerHTML = calculatedScore;
        document.querySelector("#score").firstChild.style.color = "green";
    }

    return calculatedScore;
}

//additional levels of difficulty

/** 
 * generates a random background color, to make matching harder as game progresses
 */
function singleRGBValue() {
    let oneValue = Math.random();
    oneValue  = oneValue  * 255;
    oneValue  = Math.round(oneValue);
    return oneValue;
}

/** 
 * combines 3 single r,g,b values to make a random rgb color
 */
function generateRandomColor(){
    r = singleRGBValue();
    g = singleRGBValue();
    b = singleRGBValue();
    let randomColor = `rgb(${r},${g},${b})`;
    return randomColor
};

/** 
 * builds an array of random colors to be used to assign background colors to each tile pair
 */
function buildColorSelection(generateRandomColor){
    let colorSelection = [];
    for(let colors = 0; colors < 8; colors++){
        colorSelection.push(generateRandomColor());
    }
    return colorSelection
};

function showScoreOnCompletion(){
    let finalScore = calculateScore();
    gameplayAreaRef.classList.add("d-none");
    scoreAreaRef.classList.remove("d-none");
    scoreAreaRef.classList.add("show-flex")
    scoreAreaRef.innerHTML = `
      <h4>Congratulations you Won!</h4>
      <p>Your score is <strong>${finalScore}</strong></p>
    `;
}
    

//2. addAdditional tiles -> 12, 16, 20, 24
//3. Reduce time -> decrease amount of time available to complete the game. 
//4. change icons to a math problem to be matched to the correct answer;

//additional iterations/Future development
// publish leaderboard;
//use api to generate random icon or picture

/**
 * rests the tiles to allow game to be replayed without refreshing the browser
 */
function resetTiles() {
    for (tile of tiles) {
        tile.removeAttribute("style");
        tile.removeAttribute("guess");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
    clicks = 0;
    correctMatches = 0;
    document.getElementById("timer").firstChild.innerText ="";
    document.getElementById("clicks").firstChild.innerText ="";
    document.getElementById("score").firstChild.innerText ="";
    setRandomTileOrder(16);
}

