//global variables
const endButtonRef = document.querySelector('#endGame')
const startButtonRef = document.querySelector("#startGame")
const tiles = document.querySelectorAll(".gametile");
const gameplayAreaRef = document.querySelector("#gameplay-area");
const scoreAreaRef = document.querySelector("#scoreboard");
const difficultySelectionRef = document.querySelector("#difficulty");
const gameSettingsRef = document.querySelector("#game-settings-label");
let themeSelectionRef = document.querySelector("#theme");

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

const cat = `<i class="fas fa-cat"></i>`;
const crow = `<i class="fas fa-crow"></i>`;
const dog = `<i class="fas fa-dog"></i>`;
const dove = `<i class="fas fa-dove"></i>`;
const frog = `<i class="fas fa-frog"></i>`;
const fish = `<i class="fas fa-fish"></i>`;
const hippo = `<i class="fas fa-hippo"></i>`;
const horse = `<i class="fas fa-horse"></i>`;
const otter = `<i class="fas fa-otter"></i>`;
const spider = `<i class="fas fa-spider"></i>`;

const tent = `<i class="fas fa-campground"></i>`;
const caravan = `<i class="fas fa-caravan"></i>`;
const compass =`<i class="far fa-compass"></i>`;
const hiking = `<i class="fas fa-hiking"></i>`;
const map =`<i class="fas fa-map-marked-alt"></i>`;
const signs =`<i class="fas fa-map-signs"></i>`;
const mountain =`<i class="fas fa-mountain"></i>`;
const route = `<i class="fas fa-route"></i>`;
const tree =`<i class="fas fa-tree"></i>`;

/**
 * Game Themes
 */
const iconsTheme = [football, pizza, rocket, bacteria, kiwi, cocktail, fire, anchor];
const animalsTheme = [cat, crow, dog, dove, fish, frog, hippo, horse, otter, kiwi, spider];
const outdoorsTheme = [tent, caravan, compass, hiking, mountain, tree, signs, route, map, fire, fish]
const numbersTheme = buildNumbersArray();

let clicks = 0;
let tileIcon;
let tileIcons = [];
let tileIds = [];
let n = 0;
let correctMatches = 0;
let bgColors = buildColorSelection(generateRandomColor);
let gameplayTime = 60;
let gameTheme = iconsTheme;

//Event Listeners
startButtonRef.addEventListener("click", startGame);
endButtonRef.addEventListener("click", endGame);
difficultySelectionRef.addEventListener("change", setDifficulty);
themeSelectionRef.addEventListener("change", setTheme);

function startGame() {
    endButtonRef.disabled = false;
    startButtonRef.disabled = true;
    resetTiles();
    disableGameSettings();
    startTimer(setDifficulty);
    //displayTile -> function which listens for click event and displays tile value on click
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
}

function endGame() {
    endButtonRef.disabled = true;
    startButtonRef.innerHTML = `New<br class="d-inline d-sm-none"> Game`;
    startButtonRef.disabled = false;
    enableGameSettings();
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
    
    setTiles(randomOrderArray, setTheme());
}

/**
 * This function assigns pairs of icons to the game tiles
 * it takes the parameter randomOrderArray which shuffles the tile order, creating a unique tile order
 * @param {array} randomOrderArray 
 */
function setTiles(randomOrderArray, tileThemeArray) {
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
    /**
 * Sets the inner values and custom attribute for each tile pair
 * @param {Array} tileThemeArray 
 * @param {Array} bgColors 
 * @param {Number} num 
 */
    function assignTileInner(tileThemeArray, bgColors, num) {
        tile.innerHTML = tileThemeArray[num];
        tile.setAttribute("icon", tileThemeArray[num])
        tile.addEventListener("click", function(){
            this.style.backgroundColor = bgColors[num];
        })
    }
}

/** 
 * starts timer when game is started end when game is complete or game is cancelled.
*/
function startTimer() {
    console.log(gameplayTime)
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 1, timer = setInterval(function () {
        document.getElementById("timer").firstChild.innerText = count++;

        //If time runs out, game is ended
        if (count === (gameplayTime + 2)) {
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
    } return
};


/**
 * checkMatch tests to see if first selection, matches second selection
 * @param {Array} tileIcons 
 * @param {Array} tileIds 
 * @param {Number} n 
 */
function checkMatch(tileIcons, tileIds, n) {
    function resetIncorrectMatch(count){
        document.getElementById(tileIds[count]).style.backgroundColor = "red";
        //re-enable click event listener for tiles if match attempt is unsuccessful
        document.getElementById(tileIds[count]).addEventListener("click", displayTile);
        setTimeout(function () {
            document.getElementById(tileIds[count]).classList.remove("displayTile");
            document.getElementById(tileIds[count]).removeAttribute("style");
        }, 500);
    }

    function setCorrectMatch(count){
        document.getElementById(tileIds[count]).classList.add("gametile-overlay");
        document.getElementById(tileIds[count]).setAttribute("guess", "correct")
        document.getElementById(tileIds[count]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[count]).style.pointerEvents = "none";
        setTimeout(function () {
            document.getElementById(tileIds[count]).classList.remove("gametile-overlay");
        }, 500);
    }

    if (tileIcons[n] !== tileIcons[n + 1]) {
        resetIncorrectMatch(n+1)
        resetIncorrectMatch(n)
    } else {
        setCorrectMatch(n+1)
        setCorrectMatch(n)
        countCorrectAnswers()
    }
}

function countCorrectAnswers() {
    correctMatches++;
    if (correctMatches === 8) {
        endGame(); 
    } 
    return correctMatches
}

/**
 * calculates number of user clicks -> needed to calculate score
 */
function countMoves() {
    clicks++;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
    return clicks
}

/**
   * adds number of clicks and elapsed time to calculate score & displays score upon game completion
   */
function calculateScore() {
    let timeAtEnd = endTimer();
    timeScore = parseInt(timeAtEnd);
    let calculatedScore = (timeScore + (clicks + 1));
    return calculatedScore;
}

function showScoreOnCompletion(){
    let correctAnswersOnQuit = countCorrectAnswers();
    correctAnswersOnQuit = correctAnswersOnQuit - 1;
    calculatedScore = calculateScore();
    let resultType = isNaN(calculatedScore);
    
    if(resultType){
        document.querySelector("#score").firstChild.innerHTML = "0";
        document.querySelector("#score").firstChild.style.color = "red";
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex")
        scoreAreaRef.innerHTML = `
        <h4>Game Over</h4>
        <p>You ran out of time</p>
        `;
    } else if (correctAnswersOnQuit < 8){
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex")
        scoreAreaRef.innerHTML = `
        <h4>Game Over</h4>
        <p>You quit before finishing</p>
        `;  
    } else {
        document.querySelector("#score").firstChild.innerHTML = calculatedScore;
        document.querySelector("#score").firstChild.style.color = "green";
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex")
        scoreAreaRef.innerHTML = `
        <h4>Congratulations you Won!</h4>
        <p>Your score is <strong>${calculatedScore}</strong></p>
        `; 
    }
    sendScoreToLocalStorage(calculatedScore);
    scoreAreaRef.addEventListener("click", hideScoreboard);
}

function hideScoreboard(){
    gameplayAreaRef.classList.remove("d-none");
    scoreAreaRef.classList.remove("show-flex");
    scoreAreaRef.classList.add("d-none");
}

/**
 * hides game settings menu when game is in play to prevent user error
 */
function disableGameSettings(){
    gameSettingsRef.style.display = "none";
    gameSettingsRef.nextElementSibling.classList.remove("show"); 
}

/**
 * shows game settings menu when game is ended, to allow game settings to be changed between gameplay
 */
function enableGameSettings(){
    gameSettingsRef.style.display = "block";
}

/**
 * resets the tiles to allow game to be replayed without refreshing the browser
 */
function resetTiles() {
    for (tile of tiles) {
        tile.removeAttribute("style");
        tile.removeAttribute("guess");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
    hideScoreboard();
    clicks = 0;
    correctMatches = 0;
    document.getElementById("timer").firstChild.innerText ="";
    document.getElementById("clicks").firstChild.innerText ="";
    document.getElementById("score").firstChild.innerText ="";
    setRandomTileOrder(tiles.length);
}

//additional levels of difficulty

/**
 * Takes user input from game settings form
 * Increased difficulty = less time allowed to complete game.
 */
function setDifficulty(){
    
    console.log(this.value)
    gameDifficulty = this.value;

    if(gameDifficulty === "hard"){
        gameplayTime = 40;
    } else if(gameDifficulty === "easy"){
        gameplayTime = 120;
    } else {
        gameplayTime = 60;
    }
    console.log(gameplayTime);
    return gameplayTime;
}

/**
 * Takes user input from game settings form
 * Sets the icon theme on each game tile
 */
function setTheme(){
    let chosenTheme = this.value;

    if (chosenTheme === "random"){
        gameTheme = iconsTheme
        return gameTheme
    } else if( chosenTheme === "numbers"){
        gameTheme = numbersTheme
        return gameTheme
    } else if (chosenTheme === "animals"){
        gameTheme = animalsTheme
        return gameTheme
    } else if(chosenTheme === "outdoors"){
        gameTheme = outdoorsTheme
        return gameTheme
    }
    return gameTheme;
}

/** 
 * generates a random background color, to make matching harder as game progresses
 */
function generateRandomNumber(chooseNumber) {
    let randomNumber = Math.random();
    randomNumber  = randomNumber  * chooseNumber;
    randomNumber  = Math.round(randomNumber);
    return randomNumber;
}

/** 
 * combines 3 single r,g,b values to make a random rgb color
 */
function generateRandomColor(){
    r = generateRandomNumber(255);
    g = generateRandomNumber(255);
    b = generateRandomNumber(255);
    let randomColor = `rgb(${r},${g},${b})`;
    return randomColor
};

/** 
 * builds an array of random colors to be used to assign background colors to each tile pair
 */
function buildColorSelection(){
    let colorSelection = [];
    for(let i = 0; i < tiles.length; i++){
        let checkValue = generateRandomColor();
        if(!colorSelection.includes(checkValue)){
            colorSelection.push(checkValue);
        } else {
            --i;
        }
    }
    return colorSelection
};

/**
 * Builds random array of numbers that provides the values for the numbers theme
 */
function buildNumbersArray(){
    let randomNumbersTheme =[];
    for(let i = 0; i <tiles.length; i++){
        let checkValue = generateRandomNumber(tiles.length);
        if(!randomNumbersTheme.includes(checkValue)){
            randomNumbersTheme.push(checkValue);
        } else {
            --i;
        }
    }
    return randomNumbersTheme;
}

/**
 * Stores the calculated score in localStorage
 * Used to populate leaderboard
 * @param {num} calculatedScore 
 */
function sendScoreToLocalStorage(calculatedScore){

    //credit: isNumber function sourced from https://stackoverflow.com/questions/20169217/how-to-write-isnumber-in-javascript

    let isNumber = function isNumber(value){
        return typeof(value) === "number" && isFinite(value)
    }

    let topScore = window.localStorage.getItem("score");
    console.log(topScore);

    if(!isNumber(calculatedScore)){
        return;
    } else if (calculatedScore < topScore){
        window.localStorage.setItem("score", calculatedScore);
    } else {
        console.log("check best score")
    }
}


//General Styling/Interactivity

/**
 * adds wiggle effect to main navigation items
 */
let navRef = document.querySelector("#nav-list").children;

for(navItem of navRef){
    navItem.addEventListener("mouseover",function(e){
        e.target.classList.add("wiggle")
    });
    navItem.addEventListener("mouseout",function(e){
        e.target.classList.remove("wiggle")
    });
}




