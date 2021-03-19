# Memory Minder Memory Game
![Homepage screenshot](assets/images/)
[Visit the Deployed Site on github pages](https://nickassafkirk.github.io/Memory_Minder_Memory_Game/)

---
## Overview
Memory minder is a fun, interactive brain-training game designed for adults and children*. The game's purpose is to test the users memory, reaction-speed and recall while providing an enjoyable experience during gameplay.
To complete the game, the user must match all the tile pairs, in as few moves as possible and as quickly as they can. This game is a great excercise to challenge a user's short-term memory and reaction speeds and is the perfect activity for 
coffee breaks, keeping children entertained or killing some time while travelling on public transport. 

*while this game is perfectly suitable for children over 6. We recommend parents supervision while playing.

---
## UX



---
## Strategy

### Ideal User
The ideal user for this site is: 
- An ideal user is 12 years or older.
- An ideal user will be technmology savvy.
- An ideal user will be a regular smart phopne/device user.
- An ideal user enjoys traditional games like card games, board games, sudoku, crosswords etc...

### User Goals
- A user wishes to enjoy themselves while playing the game.
- A user wishes to understand the game with minimal instruction.
- A user wants to start the game at their own leisure.
- A user wants to end the game when they wish.
- A user wants to be able to start a new game when they choose.
- A user expects a different board layout with each new game.
- A user needs to be notified if they have made a correct or incorrect move.
- A user needs to receive notification when they have completed a game.
- a user needs to set the difficulty level to match their ability
- A user wants to see their score when they have finished the game.
- A user wants to see their best score in a session.
- A user wants to remain interested after playing several games



### User Stories

- As a new user, I want to enjoy playing the game.
- As a new user, I want to understand how to play the game without having to read the instructions.
- As a new user, I want to be challenged by the game but not frustrated by it's level of difficulty.
- As a return user, I want to see how my result compares to my previous attempts.
- As a user, I want to select my preferred game theme.
- As a user, I want to be able to play the game on a mobile device.

---
## Scope 

### Features to be included in initial iteration
- A consistent page header and logo.
- A means to navigate between pages.
- A Game Board with up to 16 tiles.
- A How to play page to detail game rules and instructions.
- A leaderboard to display a users score and to encourage aspiration for victory and repeat play.
- A child mode with easier game play and suitable tile icons.
- A feedback form to provide feedback to the game owner.

### Features/Functionality to be added
- Publish users scores to an online leaderboard.
- Add a story mode where additional levels of difficulty are added based on win streaks.

---
## Structure

### Pages
#### 1. [Homepage](https://nickassafkirk.github.io/Memory_Minder_Memory_G) 
The Primary landing page for the site where the gameboard is located. 
This page includes: 
- a main navigation bar to allow user to navigate between site pages.
- Game control buttons allowing users to start/Stop gameplay

#### 2. [How To Play](https://nickassafkirk.github.io/Memory_Minder_Memory_Game/rules.html)
This page provides users with: 
- An introductiuon to the game's goals and intention
- A step by step guide on how to play the game.
- An explanation of how the game is scored.

#### 3. [Leaderboard]()
---
### Detailed Features

#### [Homepage]() 
#### [How To Play]() 
#### [Leaderboard]() 
#### [404]() 


---
## Skeleton

### Navigation

1. **Main Navigation:** A consistent top nav bar menu is present at the top of each page to allow navigation to the key site pages from each individual webpage. 
2. **Buttons:** 


### Wireframes

#### Homepage: Desktop View
![Homepage Wireframe Desktop](wireframes/Memory-Game-Homepage.png)

#### How To Play Page: Desktop View
![Homepage Wireframe Desktop](wireframes/Memory-Game-How-to-play.png)

### Mockups
![Homepage screenshot]()

A responsive view of the site can be found at [this link](http://ami.responsivedesign.is/)

---
## Surface

### Fonts
**General**     

---

### Colors      
Colors are used to increase contrast, visual impact and to improve readability across the site.Colors are used during game play to aciliatate matching of tile pairs.
Root variables are used to allow quick stylisitic changes to be made and to facilitate future color changes if necessary. The main colors used on this project are as follows:

---

### Icons

All icons utilised for this project were sourced from [fontawesome.com](https://fontawesome.com/).

---

### Images 

---

### Animations


---

## Testing

The current deployed version of this project has been thoroughly tested to ensure a great user experience on most common device types.
Testing has also confirmed compatibility with all common browsers to accommodate a great user experience and predictable functionality 
for as many users as possible. 

The responsive functionality of the site has been tested to work on most common devices with a 320px screen-width and larger. 

---

## Code 

The code in this project was written by me ([Nick Kirk](https://github.com/nickassafkirk)) the project owner. Any code snippets written by other developers or found from online resources have been credited
in the credits section below.

### Bugs

**Bug:** If start Game button is clicked when timer is already running, The timer speeds up and the end game button no longer stops the game.
**Fix:** clearInterval(timer) when the startTimer function is called before doing anything else. This resets the timer each time the timer is run
credit: solution was found at this [stack overflow post](https://stackoverflow.com/questions/31036619/timer-goes-twice-as-fast-when-triggered-again/31036796)

**Bug:** User could click on tiles before pressing the startGame button. This enabled to get a head start by matching tiles before the timer had started. 
**Fix:** The click event listeners on each game tile are only initiated when the game has been started by clicking the startGame button.

**Bug:** When ***"End Game"*** button was clicked, the ***"New Game"*** button was not not displaying as equal height top the end button.   
**Fix:** Template literal was used to insert a <br> element to be displayed on small screensizes. This <br> element was accidentally removed when the innerText
of the button was changed on button click.

![button sizing bug screenshot](assets/images/button-alignment-bug.png)

**Bug** An extra value was being added to the moves score output box upon game completion. 
**Fix** the countClicks() function was being called by the calculateScore() function upon game completion as a result an
extra increment was being added to the moves counter when the game was completed. TYo fix this the calculation was changed to use the clicks value which is returned by the 
countClicks() function so that the moves box does not display the incorrect answer on game completion

**Bug** Re-clicking a correctly matched tile changed it's background-color. While this did not affect the functionality of the game( ie it did not register as a click, move or affect the scoring etc...)
it was deemed confusing, as user may interpret a change of color as a sign that this tile is still available for use. 
**Desired behaviour** Correctly matched tile pairs should have matching background colors and should have all event listeners removed to prevent any further involvement in the game or
additional style changes.
**Source of Bug** The issue was found to be due to a click event listener that is was applied within the setTiles function (shown below), This click event listener calls an anonymous function which assigns a matching background color to each pair of tiles, to be revealed  when each tile is clicked and revealed. 
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

**Bug** If game settings have been changed, the game settings dropdown menu would remain displayed, despite the game settings label being hidden. 

![game settings bug screenshot](assets/images/game-settings-bug.png)    

**Desired Behaviour** Game settings label and dropdown menu should be hidden to prevent user error during game play.
**Source of bug** The bootstrap `.show` class was applied to the `<div id="game-settings">...</div>` element which caused this div element to remain visible when the game was in play.
**Bug Fix** The `.show` class is removed when a new game commences by using the following code `gameSettingsBodyRef.classList.remove("show");` .


**Bug** When clicking tiles at random and extemely fast, it was possible to cause incorrectly matched tiles to remain displayed and unclickable. 
This prevented game completion because all tile pairs could not be matched. 
**Source of bug** Timeouts are included within the checkMatch function to highlight incorrect or correct matches in order to provide user feedback. 
Resetting each tile's value takes place within the 500 millisecond timeout, so users can quickly see the value of the second tile they have clicked before it's icon is hidden again, in the case of
an incorrect match. However if a user clicked tiles extremely fast, it was possible to reclick a tile before it's value had been reset. This then registrered the value of the click as `null` 
which consequently meant that the checkMatch function would then be checking for match against a `null` value which effectively broke the game.
**Fix** An if statement was added to prevent `null` or `undefined` values being tested by the checkMatch function.

`if (tileIcon != null && tileIcon != undefined && tileId != null && tileId != undefined){
        tileIcons.push(tileIcon);
        document.getElementById(tileId).removeEventListener("click", displayTile);
        tileIds.push(tileId);
    }
`
This prevented the described bug and also ensured that these dead clicks were not counted towards the game moves calculation.
After implementing this fix, the game functioned as anticipated.







**Credit** 


### Vendor Prefixes
Vendor prefixes were added to the main stylesheet using [autoprefixer](https://autoprefixer.github.io/) to ensure styles are applied as consistently 
as possible across different browsers.

---

## Technologies Used

![HTML5 Logo](assets/images/technologies/html5.png)
### HTML5 
[https://www.w3.org/html/](https://www.w3.org/html/) 

Is used to add content, structure and the ability to navigate to the website.


![CSS Logo](assets/images/technologies/css3.png)
### CSS3
[https://www.w3.org/TR/CSS/](https://www.w3.org/TR/CSS/) 

Is used to add styles, layout, design and interactivity to the page and to increase usability to users across various devices. 


![Bootstrap logo](assets/images/technologies/bootstrap.png)
### Bootstrap V4.5.3 
[https://getbootstrap.com/](https://getbootstrap.com/) 

Is used to add structure, layout and a mobile-first responsive design to the website. 

Javascript, jQuery and Popper.js are also referenced by bootstrap for responsive components like the navbar, modals, collapse and accordian.

![Gitpod Logo](assets/images/technologies/gitpod.png)
### Gitpod
[https://www.gitpod.io/](https://www.gitpod.io/) 

Is used to write, edit and preview code.


![Github](assets/images/technologies/github.png)
### GitHub 
[https://github.com/](https://github.com/)

Is used to host, share and deploy the project.


![Balsamiq Logo](assets/images/technologies/balsamiq.png)
### Balsamiq
[https://balsamiq.com/](https://balsamiq.com/)

Is used to create wireframes as visual mockups of the final site design

---

## Credits

### Content Credits
All text is unique content written by me, ([Nick Kirk](https://github.com/nickassafkirk)) the project owner, for the purpose of this project. 

### Icons/Imagery
#### CSS Icons
- The correct css code used to add a check mark to css content property was found [here](https://www.toptal.com/designers/htmlarrows/symbols/check-mark/)
- The correct css code used to add a X mark to css content property was found [here](https://www.toptal.com/designers/htmlarrows/symbols/ballot-x/)

---

### Code Credits

#### Pointer Events
- The `pointer-events: "none"` css property was used to prevent additional click events on correectly matched game tiles.
- Information regarding pointer-events was found at these links: 
  1. [Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
  1. [CSS Tricks](https://css-tricks.com/almanac/properties/p/pointer-events/)

#### IsNumber function 
- A small code snippet to check if a value is a number was utilised from [this stackoverflow post](https://stackoverflow.com/questions/20169217/how-to-write-isnumber-in-javascript)

- `var isNumber = function isNumber(value) 
{
   return typeof value === 'number' && isFinite(value);
}
`

#### CSS vmin/vmax
- To create a responsive gameboard, which has square game tiles across all screen sizes I used vmin values. I found information on vmin and vmax values in [this article](https://www.sitepoint.com/css-viewport-units-quick-)


#### Local Storage Credit
- When establishing a method by which game scores could be stored to local memory, I found information on passing values as JSON data at the following pages:
  1. [outline of JSON methods](https://m204wiki.rocketsoftware.com/index.php/List_of_Json_methods)
  1. [use of .stringify method](https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage)

#### Comparison Function
- A comparison function discovered in this [stack oveflow post](https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value)
is used to sort user game scores, so they can be listed in ascending order at the [leaderboard.html page](https://nickassafkirk.github.io/Memory_Minder_Memory_Game/leaderboard.html)
- **Original code** `function compare( a, b ) {
  if ( a.last_nom < b.last_nom ){
    return -1;
  }
  if ( a.last_nom > b.last_nom ){
    return 1;
  }
  return 0;
}
objs.sort( compare );`

---

### README Credits

#### Images

Logo brain image:
from: https://icons8.com/icons/set/brain
img: <img src="https://img.icons8.com/ios/50/000000/brainstorm.png"/>
credit: <a href="https://icons8.com/icon/74713/brainstorm">Brainstorm icon by Icons8</a>

HTML5 Logo: 
Sourced from [W3.org](https://www.w3.org/html/logo/#downloads)

CSS3 Logo:
Sourced from [wikipedia commons](https://commons.wikimedia.org/wiki/File:CSS3_logo_and_wordmark.svg)

Bootstrap Logo:
Sourced from [Wikipedia](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework))

Gitpod Logo:
Sourced from [Gitpod](https://www.gitpod.io/media-kit/)

Github Logo:
Sourced from [Github](https://github.com/logos)

Balsamiq Logo:
Sourced from [Balsamiq](https://balsamiq.com/company/brandassets/)

#### Icons:
All icons used on this project were sourced from [Fontawesome](https://fontawesome.com/).

---

## Deployment

This project was developed using the Gitpod IDE, committed to Git and pushed to GitHub using the terminal within Gitpod and the Gitpod extension for Chrome. 

---

### Deployment Instructions 
To deploy this page to GitHub Pages from its GitHub repository, the following steps were taken:

1. First log into [GitHub account](https://github.com/nickassafkirk).
1. From the list of pinned repositories on the home screen, select "Cartel-Coffee".
1. From the menu items which includes *Code, Issues, Pull request, Actions, Projects, Wiki, Security, Insights and settings* 
select the **settings** tab.
1. Within the settings section, scroll down to the **GitHub Pages** section.
1. Under **Source** subheading click the drop-down menu labelled "None" and select "Master Branch"
1. Leave the default /Root folder selected and click save.
1. On selecting Master Branch and saving the page is automatically refreshed, the website is now deployed.
1. Return to the settings section and scroll back down to the GitHub Pages section to retrieve the link to the deployed website.
1. (Optional) Add the website link to the repository info box for ease of use. In the sidebar to the right click the cog icon to the right of the about subheading
and paste the website url into the box labelled "website"

---
### Cloning instructions with Gitpod
To clone this project using Gitpod you will need:

A Github account. [Create a Github account here](https://github.com/join)
Use the Chrome browser
Then follow these steps:

1. Install the [Gitpod Browser Extentions for Chrome](https://chrome.google.com/webstore/detail/gitpod-dev-environments-i/dodmmooeoklaejobgleioelladacbeki?hl=en)
2. After installation, restart your browser
3. Log into Gitpod with your github account.
4. Navigate to the [Project GitHub repository](https://github.com/nickassafkirk/Memory_Minder_Memory_Game)
5. Click the green "Gitpod" button in the top right corner of the repository
6. This will open a new gitpod workspace with a clone of the repository

---
### Cloning instructions to a local editor
To work on the project code within a local IDE such as VSCode, Pycharm, brackets etc:

1. Go to the Github repository at [this link](https://github.com/nickassafkirk/Memory_Minder_Memory_Game)
2. Under the repository name, click the code tab from the menu items
3. In the submenu to the right which has the options: go to file, add file and code, select the code option. 
4. In the Clone with HTTPs section, copy the clone URL for the repository.
5. In your local IDE open the terminal.
6. Change the current working directory to the location where you want the cloned directory to be made.
7. In the terminal type git clone, and then paste the URL you copied in Step 3.
   This should follow the format git clone https://github.com/github-username/repository-name.git
8. Press Enter to successfully clone the repository to your local IDE
9. For more information on cloning from github [see this page](https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use)

---

### Forking instructions
To Fork this repository:

1. Go to the [github homepage](https://github.com/).
1. Sign into Github or sign up for a new account.
1. Find the repository you wish to fork. 
(*([For example this project](https://github.com/nickassafkirk/Memory_Minder_Memory_Game))*
1. On the right hand side of the repository page you will see options to watch, star or fork. Click Fork.
1. This will create a copy of the project in a new repository within your github account.
1. Once the fork has been created in your github account, it can then be cloned to your prefered editor using one of the methods outlined above.
1. After changes have been made locally they can be submitted via pull request for approval and inclusion in the original project.

---

## Acknowledgements

I'd like to thank my mentor Nishant Kumar for his help and advice throughout this project. His encouragement and feedback we're invaluable in the completion of this project.


