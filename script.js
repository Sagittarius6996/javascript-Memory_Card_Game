const emoji = ["🤤", "👅", "🫦", "😁", "💀", "😂", "🥵", "🤡"];
const emojis = [...emoji, ...emoji];
const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const setupRestart = document.getElementById("restart-btn");


let moves = 0;
let timer = document.getElementById("timer");
let time = 0;
let timeStarted = false;
let startTimer;
let firstCard = null;
let secondCard = null;
let lockBoard = false;


function timerDisplay() {
    startTimer = setInterval(() => {
        time++;
        updateDisplay();
    }, 10);
    return startTimer;
}
function remainingSecs() {
    return Math.floor(time % 360000)
}
function mins() {
    return Math.floor(remainingSecs() / 6000);
}
function secs() {
    return Math.floor(remainingSecs() % 6000 / 100);
}
function centi() {
    return Math.floor(remainingSecs() % 100)
}
function format(num) {
    if (num < 10) {
        num = `0${num}`;
        return num;
    }
    else
        return num;
}
function updateDisplay() {
    timer.textContent = `${format(mins())}:${format(secs())}:${format(centi())}`;
}


function classCard(card) {
    card.classList.add("card");
}
function addCard(card) {
    board.appendChild(card);
}
function addFront(card) {
    const front = document.createElement("div");
    card.appendChild(front);
    front.classList.add("front");

    return front;
}
function addBack(card, emojis, i) {
    const back = document.createElement("div");
    card.appendChild(back);
    back.classList.add("back");
    back.innerText = emojis[i];
    return back;
}
function shuffle(emojis) {
    var temp;
    for (let i = 0; i < emojis.length; i++) {
        const rand = Math.floor(Math.random() * emojis.length);
        temp = emojis[i];
        emojis[i] = emojis[rand];
        emojis[rand] = temp;
    }
}


function createDiv() {
    for (let i = 0; i < emojis.length; i++) {
        const card = document.createElement("div");
        classCard(card);
        addCard(card);
        const front = addFront(card);
        const back = addBack(card, emojis, i);
        if (lockBoard === false) {
            card.addEventListener("click", () => {
                if (lockBoard) {
                    return;
                }

                if (card.classList.contains("matched")) {
                    return;
                }
                card.classList.add("flip");

                if (firstCard === null) {
                    firstCard = card;
                    if (timeStarted === false) {
                        timerDisplay();
                        timeStarted = true;
                    }
                }
                else {

                    secondCard = card;
                    lockBoard = true;
                    const firstBack = firstCard.querySelector(".back");
                    const emo1 = firstBack.innerText;

                    const secondBack = secondCard.querySelector(".back");
                    const emo2 = secondBack.innerText;

                    moves++;
                    movesDisplay.innerText = `Moves: ${moves}`;

                    if (emo1 === emo2) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        let match = document.querySelectorAll(".matched");
                        if (match.length === emojis.length) {
                            clearInterval(startTimer);
                        }

                        firstCard = null;
                        secondCard = null;
                        lockBoard = false;

                    }
                    else {
                        setTimeout(() => {
                            firstCard.classList.remove("flip");
                            secondCard.classList.remove("flip");

                            firstCard = null;
                            secondCard = null;

                            lockBoard = false;
                        }, 800);

                    }

                }
            }

            )
        }

    }
}


function restart() {
    setupRestart.addEventListener("click", () => {
        moves = 0;
        movesDisplay.innerText = `Moves: ${moves}`;
        time = 0;
        clearInterval(startTimer);
        updateDisplay();
        timeStarted = false;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        board.innerHTML = "";
        shuffle(emojis);
        createDiv();
    })
}


restart();
shuffle(emojis);
createDiv();
