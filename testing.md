
[Link to README.md](README.md)

Link to deployed site](https://nickassafkirk.github.io/Memory_Minder_Memory_Game/)


## Compatibility

Compatibility testing involved going through the site thoroughly to ensure that the format, layout, styles and functionality of the site perform as intended. 

Testing involved: 


1. Testing the site using multiple browsers to ensure cross-browser compatibility.
   The following browsers were tested for the current deployed version of this site:

   | Browser       | Compatible |
   | --------------|------------|
   | Chrome        |   &#9745;  |
   | Safari        |   &#9745;  |
   | Firefox       |   &#9745;  |
   | Opera         |   &#9745;  |
   | Microsoft Edge|   &#9745;  |

   Unfortunately it was not possible to test the site functionality on internet explorer as no version was available for IOS. 

1. Testing the site across a range of devices to ensure a responsive site that provides a great user experience on all devices.
   The site was tested on: 

   | IOS           | Windows/Android         |
   |---------------|-------------------------|
   |Macbook Pro 13"| Hp Pavillion 22"        |
   |Iphone 5s      | Samsung a51             |
   |Iphone 6s Plus | Samsung a50             |
   |Iphone SE      | Xiaomi Redmi note 9 Pro |
   |Iphone XS      |
   |Ipad Mini      |
   
1. Testing the site using chrome dev tools to confirm desired functionality across all breakpoints and screen-widths. 

1. Additional testing was carried out by asking friends and family to test the site and to provide feedback on a range of devices. 

## User Story Testing

1. ### As a new user, I want to enjoy playing the game.
- To test: I played the game several times and then shared the game with multiple friends and family. Having received responses from multiple people, the unanimous decision was that users enjoyed the game and found it easy to use. the feedback was generally positive and 
multiple users send screenshots to show that they had beaten their top scores.
- Result: The tests carried out satisfy the user story that the game must be enjoyable for new users.

1. ### As a new user, I want to understand how to play the game without having to read the instructions.
- To test: A new user lands on the homepage. A new user sees a large green start game button. There are no other buttons that are available to the user except the game settings dropdown. The user is forced to press the start game button. 
Once the button is pressed the timer starts, this indicates to the user that the game has started. The only clickable elements available to the user are the end button and the tiles. Therefore the user must click a tile. On clicking a tile 
a tile's image is revealed. The selected tile remains revealed. Clicking th selected tile again has no affect. The user has no option but to click another tile. If the second guess is wrong, a red mask is flashed over the tile and both tiles are hidden again. This indicates that an incorrect move has been made. 
If a correct match is made a green mask flashes over the tiles and they remain displayed. If user clicks on the correctly matched tile, it has no effect, therefore user must select another unmatched tile. A user will continue matching tiles until all tiles are matched, time runs out or they end the game by pressing the end button.
If the time runs out a message is displayed on the scoreboard that time ran out, this teaches the user that they must complete the game within th allotted time or they will fail. If the user ends the game a mesasge is displayed which teaches the user that a score is only registered if the game is completed. 
If the user correctly matches all the tiles and finishes the game, then their score will be displayed on the scoreboard. This teaches the user that when they finish a game their score will be retunred.
for all 3 scenarios, upon game completion the only active button is now the new game button. This means after completing the game, a user can only start a new game or visit another site page by accessing it from the main navigation.
If the user still needs help, there's a large how to play option in the main navigation. This indicates that instructiional material is available if necessary which improves user confidence.
-Result: By following the steps above

1. ### As a new user, I want to be challenged by the game but not frustrated by it's level of difficulty.
-To test: a user lands on the index.html page. Having played the game once and ran out of time, the user  establishes that the game level is too hard. After ending a game a bright game settings banner is displayed above the game area.
clicking this banner opens a dropdown whcih includes a difficulty dropdopwn. The user selects the easy option. The user starts a new game and plays the game again. This time the user completes the game within the allotted time. The user is satisfied with the level of difficulty.
Having played the game several times, the user wants to allow themselves a harder challenge. The follow the steps as outlined before and select a harder difficulty. They play the game and experiment with the different levels until their preferred level is set. 
-Result: The game fulfils the user story outlined above.
1. ### As a return user, I want to see how my result compares to my previous attempts.
1. ### As a return user, I expect a predictable and consistent gaming experience.
1. ### As a user, I want to edit the game appearance to remain interested in the game.
1. ### As a user, I want to be able to play the game on a mobile device.
1. ### As a user, I need to receive feedback when a correct/incorrect move has been made.
1. ### As a user, I expect the game to stop when I have completed the game.
1. ### as a user, I need to be able to access game instructions if I need help understanding how to play the game.

## Manual Testing

## Bugs

### Bugs

#### Multiple timer starts possible in single game bug
- **Bug:** If start Game button is clicked when timer is already running, The timer speeds up and the end game button no longer stops the game.
- **Desired Behaviour:** Timer will start once when game is started and will stop when game is completed or when time is elapsed.
- **Fix:** clearInterval(timer) when the startTimer function is called before doing anything else. This resets the timer each time the timer is run
- **credit:** solution was found at this [stack overflow post](https://stackoverflow.com/questions/31036619/timer-goes-twice-as-fast-when-triggered-again/31036796)
`function startTimer() {
    clearInterval(Timer);
    Timer = setInterval(myTimer, 100); 
}`

#### Game tiles active before game has started bug
- **Bug:** User could click on tiles before pressing the startGame button. This enabled to get a head start by matching tiles before the timer had started. 
- **Desired Behaviour:** Game tiles are only clickable once game has started to prevent cheating. 
- **Fix:** The click event listeners on each game tile are only initiated when the game has been started by clicking the startGame button.

#### Game control buttons not formatting correctly bug
- **Bug:** When ***"End Game"*** button was clicked, the ***"New Game"*** button was not not displaying as equal height top the end button.   
- **Fix:** Template literal was used to insert a <br> element to be displayed on small screensizes. This <br> element was accidentally removed when the innerText
of the button was changed on button click.

![button sizing bug screenshot](assets/images/button-alignment-bug.png)

#### Improper score calculation bug
- **Bug:** An extra value was being added to the moves score output box upon game completion. 
- **Desired Behaviour:** The number of moves should equal the number of guesses. Each move is considered as two clicks of different tiles. 
- **Fix:** the countClicks() function was being called by the calculateScore() function upon game completion as a result an
extra increment was being added to the moves counter when the game was completed. To fix this the calculation was changed to use the clicks value which is returned by the 
countClicks() function so that the moves box does not display the incorrect answer on game completion.

#### Retain ability to change background color of correct matches bug
- **Bug:** Re-clicking a correctly matched tile changed it's background-color. While this did not affect the functionality of the game( ie it did not register as a click, move or affect the scoring etc...)
it was deemed confusing, as user may interpret a change of color as a sign that this tile is still available for use. 
- **Desired behaviour:** Correctly matched tile pairs should have matching background colors and should have all event listeners removed to prevent any further involvement in the game or
additional style changes.
- **Source of Bug*:* The issue was found to be due to a click event listener that is was applied within the setTiles function (shown below), This click event listener calls an anonymous function which assigns a matching background color to each pair of tiles, to be revealed  when each tile is clicked and revealed. 
As the event listener calls an anonymous function, it was not possible to then remove this event listener when the tile was matched correctly. Extracting this functionality out to a function declared at global scope was not possible because the function requires a parameter to be passed that would then be uinnacessible at global scope.
Using the e.target method was also not suitable because again the necessary parameter could not be passed to the function.         
    
`function assignTileInner(tileThemeArray, bgColors, num) {
        tile.innerHTML = tileThemeArray[num];
        tile.setAttribute("icon", tileThemeArray[num])
        tile.addEventListener("click", function(){
            this.style.backgroundColor = bgColors[num];
        })**
      }`

**Fix** The pointer-events css property was applied to each correctly matched tile pairs in the setCorrectMatch function.

`document.getElementById(tileIds[count]).style.pointerEvents = "none";`

While this is not an ideal fix and ideally unneccessary event listeners should be removed, it works as intended and has not been shown 
to cause any issues in testing. An alternative method would be to clone the element to which the event listener is applied and then replace the cloned element with the clone.
This would also remove all event listeners and is documented in [this stackoverflow post](https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element)

#### Game settings card-body visible during gameplay bug
- **Bug:** If game settings have been changed, the game settings dropdown menu would remain displayed, despite the game settings label being hidden. 

![game settings bug screenshot](assets/images/game-settings-bug.png)    

- **Desired Behaviour:** Game settings label and dropdown menu should be hidden to prevent user error during game play.
- **Source of bug:** The bootstrap `.show` class was applied to the `<div id="game-settings">...</div>` element which caused this div element to remain visible when the game was in play.
- **Bug Fix:** The `.show` class is removed when a new game commences by using the following code `gameSettingsBodyRef.classList.remove("show");` .

#### Super fast tile clicking breaks game bug
- **Bug:** When clicking tiles at random and extemely fast, it was possible to cause incorrectly matched tiles to remain displayed and unclickable. 
This prevented game completion because all tile pairs could not be matched. 
- **Source of bug:** Timeouts are included within the checkMatch function to highlight incorrect or correct matches in order to provide user feedback. 
Resetting each tile's value takes place within the 500 millisecond timeout, so users can quickly see the value of the second tile they have clicked before it's icon is hidden again, in the case of
an incorrect match. However if a user clicked tiles extremely fast, it was possible to reclick a tile before it's value had been reset. This then registrered the value of the click as `null` 
which consequently meant that the checkMatch function would then be checking for match against a `null` value which effectively broke the game.
- **Fix:** An if statement was added to prevent `null` or `undefined` values being tested by the checkMatch function.

`if (tileIcon != null && tileIcon != undefined && tileId != null && tileId != undefined){
        tileIcons.push(tileIcon);
        document.getElementById(tileId).removeEventListener("click", displayTile);
        tileIds.push(tileId);
    }
`
This prevented the described bug and also ensured that these dead clicks were not counted towards the game moves calculation.
After implementing this fix, the game functioned as anticipated.

### Bugs Fixed

## Eixsting Bugs