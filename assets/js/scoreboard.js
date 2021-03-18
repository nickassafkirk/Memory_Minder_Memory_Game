
const getTopTen = JSON.parse(window.localStorage.getItem("topTen"));

window.onload = createLeaderboard();

function createLeaderboard(){
    let tableContainer = document.querySelector("#leaderboard");
    let tBody = document.querySelector("#addLeaderboard");
    if (getTopTen === null){
        const table = document.querySelector("table");
        table.style.display = "none";
        let newMessage = document.createElement("div");
        newMessage.classList.add("message");
        newMessage.innerHTML = `
        <h4>No scores recorded!</h4>
        <a href="index.html" class="btn btn-success">Play the game</a>
        <h4>Complete games to log your ten best scores.</h4>
        `
        tableContainer.append(newMessage);
    } else {
         getTopTen.forEach(individualScore => {
        let eachDate = individualScore.date;
        let eachScore = individualScore.score;
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${eachDate}</td><td>${eachScore}</td>`
        tBody.append(newRow);
      });
    }
}

function clearLeaderBoard(){
    console.log(topScore);
    myStorage.removeItem("score");
    console.log(topScore);
}