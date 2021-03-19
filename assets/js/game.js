

//global variables
const firstStartRef = document.querySelector("#initialStartButton");
const GameOutputsRef = document.querySelectorAll(".gameOutput");
const endButtonRef = document.querySelector('#endGame');
const startButtonRef = document.querySelector("#startGame");
const tiles = document.querySelectorAll(".gametile");
const gameplayAreaRef = document.querySelector("#gameplay-area");
const scoreAreaRef = document.querySelector("#scoreboard");
const difficultySelectionRef = document.querySelector("#difficulty");
const gameSettingsRef = document.querySelector("#game-settings-label");
let themeSelectionRef = document.querySelector("#theme");
const myStorage = window.localStorage;
let topTen = [];
const getTopTen = JSON.parse(window.localStorage.getItem("topTen"));
let topScore;
let timer;
let count;
let calculatedScore;

const football = `<i class="fas fa-football-ball"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
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
const outdoorsTheme = [tent, caravan, compass, hiking, mountain, tree, signs, route, map, fire, fish];
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
firstStartRef.addEventListener("click", startFirstGame);
startButtonRef.addEventListener("click", startGame);
endButtonRef.addEventListener("click", endGame);
difficultySelectionRef.addEventListener("change", setDifficulty);
themeSelectionRef.addEventListener("change", setTheme);

function startFirstGame(){
    const startOverlay = document.querySelector("#startFirstGame");
    startOverlay.style.display = "none";
    startGame();
    GameOutputsRef[0].removeAttribute("style");
    GameOutputsRef[1].removeAttribute("style");
}

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
    tiles.forEach(tile => tile.removeEventListener("click", displayTile));
    endButtonRef.disabled = true;
    startButtonRef.innerHTML = `New<br class="d-inline d-sm-none"> Game`;
    startButtonRef.disabled = false;
    enableGameSettings();
    showScoreOnCompletion(); 
}

/**
 * createRandom number function
 * creates random number which will later be assigned an icon
 * creates an array of random numbers which has a length which equals the number of tiles in the game
 */
function setRandomTileOrder(numberOfTiles) {    
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
    for (var tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;
        //replace numerical values with icon pairs
        if (tile.innerText < 3) {
            assignTileInner(tileThemeArray, bgColors, 0);
        } else if (tile.innerHTML < 5) {
            assignTileInner(tileThemeArray, bgColors, 1);
        } else if (tile.innerHTML < 7) {
            assignTileInner(tileThemeArray, bgColors, 2);
        } else if (tile.innerHTML < 9) {
            assignTileInner(tileThemeArray, bgColors, 3);
        } else if (tile.innerHTML < 11) {
            assignTileInner(tileThemeArray, bgColors, 4);
        } else if (tile.innerHTML < 13) {
            assignTileInner(tileThemeArray, bgColors, 5);
        } else if (tile.innerHTML < 15) {
            assignTileInner(tileThemeArray, bgColors, 6);
        } else if (tile.innerHTML < 17) {
            assignTileInner(tileThemeArray, bgColors, 7);
        } else {
            console.error("Error: too many tiles");
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
        tile.setAttribute("icon", tileThemeArray[num]);
        tile.addEventListener("click", function(){
            this.style.backgroundColor = bgColors[num];
        });
    }
}

/** 
 * starts timer when game is started end when game is complete or game is cancelled.
*/
function startTimer() {
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
        let printTimeScore = document.getElementById("timer").innerText;
        clearInterval(timer);
        return printTimeScore;
    }

/** 
 * This function reveals each tile when clicked
 * If two tiles are clicked, the checkMatch function is called to test for correct/incorrect match
 * CountMoves is also called to calculate number of user moves
*/
function displayTile(e) {

    //reveal tile by changing bg color and changing font-size from 0 to 3em;
    this.classList.remove("hideTile");
    this.classList.add("displayTile");
    
    // logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    let tileId = e.target.getAttribute("id");
    
    if (tileIcon != null && tileIcon != undefined && tileId != null && tileId != undefined){
        tileIcons.push(tileIcon);
        //prevent 1st guess from being reclicked
        document.getElementById(tileId).removeEventListener("click", displayTile);
        tileIds.push(tileId);
    }

    if (tileIcons.length % 2 == 0) {
        checkMatch(tileIcons, tileIds, n);
        n = n + 2; 
        // this counts number of clicks
        countMoves();
    } return;
}

/**
 * checkMatch tests to see if first selection, matches second selection
 * @param {Array} tileIcons 
 * @param {Array} tileIds 
 * @param {Number} n 
 */
function checkMatch(tileIcons, tileIds, n) {
    
    function resetIncorrectMatch(count){
        setTimeout(function (){
            document.getElementById(tileIds[count]).classList.add("gametile-overlay-wrong");
            setTimeout(function (){
            document.getElementById(tileIds[count]).removeAttribute("style");
            document.getElementById(tileIds[count]).classList.remove("displayTile");
            document.getElementById(tileIds[count]).classList.remove("gametile-overlay-wrong");
            //re-enable click event listener for tiles if match attempt is unsuccessful
            document.getElementById(tileIds[count]).addEventListener("click", displayTile);
            }, 500);
        }, 500);
    }

    function setCorrectMatch(count){
        document.getElementById(tileIds[count]).classList.add("gametile-overlay");
        document.getElementById(tileIds[count]).setAttribute("guess", "correct");
        document.getElementById(tileIds[count]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[count]).style.pointerEvents = "none";
        setTimeout(function () {
            document.getElementById(tileIds[count]).classList.remove("gametile-overlay");
        }, 500);
    }

    if (tileIcons[n] !== tileIcons[n + 1]) {
        resetIncorrectMatch(n+1);
        resetIncorrectMatch(n);
    } else {
        setCorrectMatch(n+1);
        setCorrectMatch(n);
        countCorrectAnswers();
    }
}

function countCorrectAnswers() {
    correctMatches++;
    if (correctMatches === 8) {
        endGame(); 
    } 
    return correctMatches;
}

/**
 * calculates number of user clicks -> needed to calculate score
 */
function countMoves() {
    clicks++;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
    return clicks;
}

/**
   * adds number of clicks and elapsed time to calculate score & displays score upon game completion
   */
function calculateScore() {
    let timeAtEnd = endTimer();
    let timeScore = parseInt(timeAtEnd);
    let calculatedScore = (timeScore + (clicks + 1));
    return calculatedScore;
}

function showScoreOnCompletion(){
    let correctAnswersOnQuit = countCorrectAnswers();
    correctAnswersOnQuit = correctAnswersOnQuit - 1;
    calculatedScore = calculateScore();
    let resultType = isNaN(calculatedScore);
    
    if(resultType){
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex");
        scoreAreaRef.innerHTML = `
        <h3>Game Over</h3>
        <p>You ran out of time</p>
        `;
    } else if (correctAnswersOnQuit < 8){
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex");
        scoreAreaRef.innerHTML = `
        <h3>Game Over</h3>
        <p>You quit before finishing</p>
        `;  
    } else {
        if(isNaN(calculatedScore || calculatedScore < 10)){
        console.error("score is not a number");
    } else if (topScore === null){
        topScore = calculatedScore;
    } else {topScore = sendScoreToLocalStorage(calculatedScore);
        gameplayAreaRef.classList.add("d-none");
        scoreAreaRef.classList.remove("d-none");
        scoreAreaRef.classList.add("show-flex");
    }
        
        if (calculatedScore < topScore){
            scoreAreaRef.innerHTML = `
        <h3>You set a new TOP SCORE!</h3>
        <br>
        <p>Your new top score is <span class="top-score">${topScore} <i class="fas fa-trophy"></i></span></p>
        `; 
        } else {
        scoreAreaRef.innerHTML = `
        <h3>Congratulations you Won!</h3>
        <br>
        <p>You scored <span class="current-score">${calculatedScore}</span></p>
        <br>
        <p>Your top score is <span class="top-score">${topScore} <i class="fas fa-trophy"></i></span></p>
        `; 
        }
    }
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
    for (var tile of tiles) {
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
    if(!isNaN(tiles.length)){
    setRandomTileOrder(tiles.length);
    }
}

//additional levels of difficulty

/**
 * Takes user input from game settings form
 * Increased difficulty = less time allowed to complete game.
 */
function setDifficulty(){
    
    let gameDifficulty = this.value;

    if(gameDifficulty === "hard"){
        gameplayTime = 40;
    } else if(gameDifficulty === "easy"){
        gameplayTime = 120;
    } else {
        gameplayTime = 60;
    }
    return gameplayTime;
}

/**
 * Takes user input from game settings form
 * Sets the icon theme on each game tile
 */
function setTheme(){
    let chosenTheme = this.value;

   if( chosenTheme === "numbers"){
        gameTheme = numbersTheme;
    } else if (chosenTheme === "animals"){
        gameTheme = animalsTheme;
    } else if(chosenTheme === "outdoors"){
        gameTheme = outdoorsTheme;
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
    let r = generateRandomNumber(255);
    let g = generateRandomNumber(255);
    let b = generateRandomNumber(255);
    let randomColor = `rgb(${r},${g},${b})`;
    return randomColor;
}

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
    return colorSelection;
}

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
function sendScoreToLocalStorage(calculatedScore) {
    let newScoreDate = new Date();
    newScoreDate = newScoreDate.toDateString();
    let newScore = { "date": newScoreDate, "score": calculatedScore };
    
    if (getTopTen === null){
        topTen = [];
        topTen.push(newScore);
    } else if (getTopTen.length < 10) {
        topTen = getTopTen;
        topTen.push(newScore);
        topTen = topTen.sort(compare);
    } else {
        let lastIndex = (getTopTen.length - 1);
        if (calculatedScore < topTen[lastIndex].score) {
            topTen[lastIndex] = newScore;
        } 
    }

    topTen = topTen.sort(compare);
    myStorage.setItem("topTen", JSON.stringify(topTen));
    topScore = topTen[0].score;
    return topScore;

    // credit: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    function compare(a, b) {
        if (a.score < b.score) {
            return -1;
        }
        if (a.score > b.score) {
            return 1;
        }
        return 0;
    }
} 

/**
 * Create button to clear exisitng score from local storage for testing purposes
 */
function clearLeaderBoard(){
    console.log(topScore);
    myStorage.removeItem("topTen");
    console.log(topScore);
}






