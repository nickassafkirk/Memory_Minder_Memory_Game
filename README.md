

### Bugs 

Bug: If start Game button is clicked when timer is already running, The timer speeds up and the end game button no longer stops the game.
Fix: clearInterval(timer) when the startTimer function is called before doing anything else. This resets the timer each time the timer is run
credit: solution was found at this [stack overflow post](https://stackoverflow.com/questions/31036619/timer-goes-twice-as-fast-when-triggered-again/31036796)

Bug: User could click on tiles before pressing the startGame button. This enabled to get a head start by matching tiles before the timer had started. 
Fix: The click event listeners on each game tile are only initiated when the game has been started by clicking the startGame button.