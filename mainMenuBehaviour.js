document.getElementById('userDetails').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('username');
    const name = nameInput.value.trim();

    if (!name || name.length < 3) {
        alert("Please enter a username with at least 3 characters.");
        return;
    }

    const user = {
        name: name,
        score: 0
    };

    localStorage.setItem('player', JSON.stringify(user));
    window.location.href = 'game.html';
});