/**
 * retrieves top scores from local storage and puts them into table
 * on scoreboard page
 */
const getTopTen = JSON.parse(window.localStorage.getItem("topTen"));

window.onload = createLeaderboard();

function createLeaderboard(){
    let showMessage = document.querySelector("#insertMessage");
    let showTable = document.querySelector("#insertTable");
    let tBody = document.querySelector("#addLeaderboard");
    if (getTopTen === null){
        showMessage.classList.remove("d-none");
    } else {
        showTable.classList.remove("d-none");
        getTopTen.forEach(individualScore => {
        let eachDate = individualScore.date;
        let eachScore = individualScore.score;
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${eachDate}</td><td>${eachScore}</td>`;
        tBody.append(newRow);
      });
    }
}
