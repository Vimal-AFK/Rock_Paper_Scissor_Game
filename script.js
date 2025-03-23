let userScore = 0;
let computerScore = 0;
let userChoice = '';
const userHand = document.getElementById('hum_hand');
const computerHand = document.getElementById('com_hand');
const userScoreBoard = document.getElementById('hum_board').querySelector('h1');
const computerScoreBoard = document.getElementById('com_board').querySelector('h1');
const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const choices = ['rock', 'paper', 'scissor'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function updateComHand(computerChoice) {
    computerHand.querySelector('img').src = `images/${computerChoice}_hand.png`;
}

function updateUserHand(userChoice) {
    userHand.querySelector('img').src = `images/${userChoice}_hand.png`;
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'scissor' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

function applyWinnerStyles(winner) {
    if (winner === 'user') {
        userHand.style.backgroundColor = 'green';
        computerHand.style.backgroundColor = 'red';
    } else if (winner === 'computer') {
        userHand.style.backgroundColor = 'red';
        computerHand.style.backgroundColor = 'green';
    } else {
        userHand.style.backgroundColor = 'grey';
        computerHand.style.backgroundColor = 'grey';
    }
}

function resetHandStyles() {
    userHand.style.backgroundColor = '';
    computerHand.style.backgroundColor = '';
}

function playGame() {
    if (!userChoice) return;

    const computerChoice = getComputerChoice();
    computerHand.querySelector('img').src = 'images/loading.png';

    setTimeout(() => {
        updateComHand(computerChoice);
        const winner = determineWinner(userChoice, computerChoice);

        applyWinnerStyles(winner);

        if (winner === 'user') {
            userScore++;
            userScoreBoard.textContent = userScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }

        userChoice = '';
    }, 1000);
}

document.getElementById('paper-button').addEventListener('click', () => {
    resetHandStyles();
    userChoice = 'paper';
    updateUserHand(userChoice);
});

document.getElementById('rock-button').addEventListener('click', () => {
    resetHandStyles();
    userChoice = 'rock';
    updateUserHand(userChoice);
});

document.getElementById('scissor-button').addEventListener('click', () => {
    resetHandStyles();
    userChoice = 'scissor';
    updateUserHand(userChoice);
});

playButton.addEventListener('click', playGame);

resetButton.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreBoard.textContent = userScore;
    computerScoreBoard.textContent = computerScore;
    userHand.querySelector('img').src = 'images/user.png';
    computerHand.querySelector('img').src = 'images/computer.png';
    userChoice = '';
    resetHandStyles();
});
