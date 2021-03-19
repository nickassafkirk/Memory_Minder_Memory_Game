
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