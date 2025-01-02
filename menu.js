// main menu + buttons
const mainMenu = document.getElementById('mainMenu');
const gameContainer = document.getElementById('gameContainer');
const startBtn = document.getElementById('btnStart');
const usernameText = document.getElementById('usernameText');
const usernameInput = document.getElementById('inputUsername');
const leaderboardBtn = document.getElementById('btnLeaderboard');
const leaderboardMenu = document.getElementById('leaderboardMenu');
const backBtnLeaderboard = document.getElementById('backtoMenu-leaderboard');
const btnHowToPlay = document.getElementById('btnHowToPlay');
const howToPlayMenu = document.getElementById('howToPlayMenu');
const backBtnHowtoplay = document.getElementById('backToMenu-howtoplay');
const bgMusic = document.getElementById('bgMusic');


startBtn.addEventListener('click', startingGame)

function startingGame() {
    const checkUsername = usernameInput.value;

    if (checkUsername.trim() === '') {
        alert('Enter username to start the game.')
        return;
    }
    
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    
    usernameText.innerHTML = usernameInput.value

    bgMusic.volume = 1;
    bgMusic.play();
    
    gameStart();
}

leaderboardBtn.addEventListener('click', function () {
    mainMenu.style.display = 'none';
    leaderboardMenu.style.display = 'flex';
})

backBtnLeaderboard.addEventListener('click', () => {
    mainMenu.style.display = 'flex';
    leaderboardMenu.style.display = 'none';
})

btnHowToPlay.addEventListener('click', () => {
    mainMenu.style.display = 'none';
    howToPlayMenu.style.display = 'flex';
})

backBtnHowtoplay.addEventListener('click', () => {
    mainMenu.style.display = 'flex';
    howToPlayMenu.style.display = 'none';
})

let leaderboardDisplay = JSON.parse(localStorage.getItem('leaderboard'))
leaderboardDisplay = leaderboardDisplay.sort((a, b) => {
    return b.score - a.score
})

const scoreTable = document.getElementById('scoreTable');
leaderboardDisplay.forEach((val, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `<td>${index + 1}</td>
                    <td>${val.nama}</td>
                    <td>${val.score}</td>`
    scoreTable.appendChild(row);
})

