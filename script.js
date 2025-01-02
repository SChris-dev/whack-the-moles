// canvas game
const canvas = document.getElementById('canvas');

canvas.width = '600';
canvas.height = '600';

const ctx = canvas.getContext('2d');

// mole image
const molesImage = new Image();
molesImage.src = 'moles.png';

// bg image
const dirtImage = new Image();
dirtImage.src = 'dirt_bg.png';

// game over image
const gameoverImage = new Image();
gameoverImage.src = 'game_over_2.png';

// cursor
const cursorImage = new Image();
cursorImage.src = 'hammer_cool.png';

// cursor click
const cursorClickImage = new Image();
cursorClickImage.src = 'hammer_cool_click.png';

const cursor = {
    x: 0,
    y: 0,
    width: 100,
    height: 120,
    clickState: false
}

canvas.addEventListener('mousemove', function (e) {
    cursor.x = e.offsetX - cursor.width / 2,
    cursor.y = e.offsetY - cursor.width / 2
})

canvas.addEventListener('mousedown', function () {
    cursor.clickState = true;
})

canvas.addEventListener('mouseup', function () {
    cursor.clickState = false;
})

function drawHammer() {
    if (cursor.clickState) {
        ctx.drawImage(cursorClickImage, cursor.x - 20, cursor.y + 20, 120, cursor.height);
    }
    else {
        ctx.drawImage(cursorImage, cursor.x, cursor.y, cursor.width, cursor.height);
    }
}

function animation() {
    drawBackground()
    drawGrid()
    drawMoles();
    drawHammer();
    requestAnimationFrame(animation);

    if (!running) {
        gameOver();
    }
    // animation() // kalau dipanggil langsung nanti nge bug
}

const moles = {
    x: 50,
    y: 50,
}
let running = true;
let timerInterval;
let gameInterval;
let score = 0;
let second = 30;
let live = 10;

function drawBackground() {
    // ctx.beginPath();
    // ctx.fillStyle = 'lightblue';
    // ctx.fillRect(0, 0, 600, 600);
    // ctx.closePath();
    ctx.drawImage(dirtImage, 0, 0, 600, 600);
}

function drawGrid() {
    ctx.beginPath();
    ctx.fillStyle = '#873C1C';

    // column 1
    ctx.fillRect(50, 50, 150, 150);
    ctx.fillRect(220, 50, 150, 150);
    ctx.fillRect(390, 50, 150, 150);

    // column 2
    ctx.fillRect(50, 220, 150, 150);
    ctx.fillRect(220, 220, 150, 150);
    ctx.fillRect(390, 220, 150, 150);

    // column 3
    ctx.fillRect(50, 390, 150, 150);
    ctx.fillRect(220, 390, 150, 150);
    ctx.fillRect(390, 390, 150, 150);

    ctx.closePath();
}

function drawMoles() {
    ctx.drawImage(molesImage, moles.x, moles.y, 150, 150);
}

// merubah posisi mole
function changeMolesPosition() {
    const position = [50, 220, 390];
    const randomX = Math.floor(Math.random() * position.length);
    const randomY = Math.floor(Math.random() * position.length);

    moles.x = position[randomX];
    moles.y = position[randomY];
}

// ngecek apakah mole kenak mouse click
function checkHit(x, y) {
    const rightSide = moles.x + 150;
    const leftSide = moles.x;
    const topSide = moles.y;
    const bottomSide = moles.y + 150;

    if (x < rightSide && 
        x > leftSide && 
        y < bottomSide && 
        y > topSide
    ) {
        return true;
    } 
    else {
        return false;
    }
}

const scoreText = document.getElementById('score');
const liveText = document.getElementById('live');
canvas.addEventListener('click', (e) => {
    if (!running) {
        return;
    }

    if (checkHit(e.offsetX, e.offsetY)) {
        score += 1;
        scoreText.innerHTML = score;
    } else {
        live -= 1;
        liveText.innerHTML = live;
        if (live <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            gameOver();
            // alert('nyawa habis! score akhir: ' + score)
        }
    }
});

const timer = document.getElementById('second');


function gameStart() {
animation();

    timerInterval = setInterval(() => {
        second -= 1;
        timer.innerHTML = second;
        if (second <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            
            gameOver();
            
        }
    }, 1000)

    gameInterval = setInterval(() => {
        changeMolesPosition();
        // drawMoles();
    }, 750)
    
}

// game over
function gameOver() {
    ctx.drawImage(gameoverImage, 0, 0, 600, 600);
    running = false;

    setLeaderboard();
}

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', () => {
    running = true;

    // reset all stats
    score = 0;
    second = 30;
    live = 10;

    // display update
    scoreText.innerHTML = score;
    timer.innerHTML = second;
    liveText.innerHTML = live;

    // clear
    clearInterval(timerInterval);
    clearInterval(gameInterval);

    gameStart();

})

function setLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []; // merubah string ke array
    

    if (leaderboard) {
        // jika ada leaderboard, maka mencari username yang sama
        let usernameHighScore = leaderboard.find(function (val) {
            return val.nama == usernameInput.value //return nama user name yang sama
        });

        if (!usernameHighScore) {
            // jika tidak ketemu, maka buat baru
            leaderboard.push({nama: usernameInput.value, score: score})
        }
        else {
            // jika ketemu, update data yang lama
            usernameHighScore.score = Math.max(usernameHighScore.score, score);
        }
    }
    else {
        localStorage.setItem('leaderboard', JSON.stringify({nama: usernameInput.value, score: score}));
        return
    }

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // guna JSON stringify merubah array ke string
}
