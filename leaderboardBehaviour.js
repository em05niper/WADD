let user = JSON.parse(localStorage.getItem('player')) ||{
    name: "NA",
    score: 0
};

console.log(user.name)

document.getElementById('leaderboardValues').textContent = user.name;