const words = [
    "javascript", "programacao", "computador", "internet", "desenvolvedor", "navegador",
    "html", "css", "frontend", "backend", "framework", "biblioteca", "algoritmo",
    "variavel", "constante", "funcao", "objeto", "array", "string", "number",
    "boolean", "null", "undefined", "json", "api", "nodejs", "react", "angular",
    "vue", "typescript", "git", "github", "terminal"
];

let selectedWord;
let hiddenWord;
let wrongGuesses;
let correctGuesses;

const wordContainer = document.getElementById("word-container");
const keyboardContainer = document.getElementById("keyboard-container");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = Array(selectedWord.length).fill("_");
    wrongGuesses = [];
    correctGuesses = [];
    wordContainer.textContent = hiddenWord.join(" ");
    message.textContent = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGallows();
    generateKeyboard();
}

function generateKeyboard() {
    keyboardContainer.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i);
        button.addEventListener("click", handleGuess);
        keyboardContainer.appendChild(button);
    }
}

function handleGuess(event) {
    const letter = event.target.textContent;
    event.target.disabled = true;

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                hiddenWord[i] = letter;
            }
        }
        wordContainer.textContent = hiddenWord.join(" ");
        correctGuesses.push(letter);

        if (!hiddenWord.includes("_")) {
            message.textContent = "Você venceu!";
            disableAllButtons();
        }
    } else {
        wrongGuesses.push(letter);
        drawHangman(wrongGuesses.length);
        if (wrongGuesses.length === 6) {
            showBloodEffect();
            message.textContent = `Fatality! A palavra era ${selectedWord}`;
            disableAllButtons();
        }
    }
}

function drawGallows() {
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(180, 180);
    ctx.moveTo(50, 180);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();
}

function drawHangman(step) {
    ctx.lineWidth = 2;
    ctx.beginPath();
    switch(step) {
        case 1: // Head
            ctx.arc(120, 50, 10, 0, Math.PI * 2, true);
            break;
        case 2: // Body
            ctx.moveTo(120, 60);
            ctx.lineTo(120, 100);
            break;
        case 3: // Left arm
            ctx.moveTo(120, 70);
            ctx.lineTo(100, 90);
            break;
        case 4: // Right arm
            ctx.moveTo(120, 70);
            ctx.lineTo(140, 90);
            break;
        case 5: // Left leg
            ctx.moveTo(120, 100);
            ctx.lineTo(100, 130);
            break;
        case 6: // Right leg
            ctx.moveTo(120, 100);
            ctx.lineTo(140, 130);
            break;
    }
    ctx.stroke();
}

function showBloodEffect() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(120, 50, 10, 0, Math.PI * 2, true);
    ctx.fill();
    message.textContent += " Fatality!";
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("#keyboard-container button");
    buttons.forEach(button => button.disabled = true);
}

restartButton.addEventListener("click", initializeGame);

initializeGame();
