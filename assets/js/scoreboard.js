
const getTopTen = JSON.parse(window.localStorage.getItem("topTen"));

window.onload = createLeaderboard();

function createLeaderboard(){
    let firstRow = document.querySelector("#addLeaderboard");
    getTopTen.forEach(individualScore => {
        let eachDate = individualScore.date;
        let eachScore = individualScore.score;
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${eachDate}</td><td>${eachScore}</td>`
        firstRow.append(newRow);
    });

}

function clearLeaderBoard(){
    console.log(topScore);
    myStorage.removeItem("score");
    console.log(topScore);
}