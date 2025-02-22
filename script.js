/* script.js */
let score = 0;
let timeLeft = 30;
let gameStarted = false;
let gameInterval;
let buttonTimeout;

const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('timeLeft');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const timeInput = document.getElementById('timeInput');

startButton.addEventListener('click', startGame);

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;

    const userTime = parseInt(timeInput.value);
    if (!isNaN(userTime) && userTime > 0) {
        timeLeft = userTime;
    } else {
        timeLeft = 30;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time left: ${timeLeft}`;
    startButton.style.display = 'none';
    timeInput.style.display = 'none';

    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    showRandomButton();
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(buttonTimeout);
    gameArea.innerHTML = '';
    gameStarted = false;
    startButton.style.display = 'block';
    timeInput.style.display = 'block';
    alert(`Game Over! Your final score is ${score}`);
}

function showRandomButton() {
    if (!gameStarted) return;

    gameArea.innerHTML = '';

    const btn = document.createElement('button');
    btn.classList.add('gameButton');

    const buttonTypes = ['normal', 'special', 'bomb'];
    const buttonType = buttonTypes[Math.floor(Math.random() * buttonTypes.length)];

    if (buttonType === 'normal') {
        btn.style.backgroundImage = "images/IMG_2203.png";
        btn.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            clearTimeout(buttonTimeout);
            showRandomButton();
        });
    } else if (buttonType === 'special') {
        btn.style.backgroundImage = "images/IMG_2204.png";
        btn.addEventListener('click', () => {
            score += 3;
            scoreDisplay.textContent = `Score: ${score}`;
            clearTimeout(buttonTimeout);
            showRandomButton();
        });
    } else if (buttonType === 'bomb') {
        btn.style.backgroundImage = "images/IMG_2202.png";
        btn.addEventListener('click', () => {
            score--;
            scoreDisplay.textContent = `Score: ${score}`;
            clearTimeout(buttonTimeout);
            showRandomButton();
        });
    }

    const maxX = gameArea.clientWidth - 100;
    const maxY = gameArea.clientHeight - 100;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    gameArea.appendChild(btn);

    buttonTimeout = setTimeout(showRandomButton, 1000);
}
