let user = JSON.parse(localStorage.getItem('player')) || {
    name: "NA",
    score: 0
};

document.getElementById('leaderboardValues').textContent = 
    `Player: ${user.name} - Score: ${user.score}`;