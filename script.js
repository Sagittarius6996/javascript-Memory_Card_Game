const emoji = ["🤤", "👅", "🫦", "😁", "💀", "😂", "🥵", "🤡"];

const emojis = [...emoji, ...emoji];

const board = document.getElementById("board");

let firstCard = null;
let secondCard = null;
let lockboard = false;


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
        if(lockboard === false){
        card.addEventListener("click", () => {
            card.classList.add("flip");

            if (firstCard === null) {
                firstCard = card;
            }
            else {

                secondCard = card;
                const firstBack = firstCard.querySelector(".back");
                const emo1 = firstBack.innerText;

                const secondBack = secondCard.querySelector(".back");
                const emo2 = secondBack.innerText;

                if (emo1 === emo2) {
                    //match
                    firstCard = null;
                    secondCard = null;
                }
                else {
                    setTimeout(() => {
                        firstCard.classList.remove("flip");
                        secondCard.classList.remove("flip");

                        firstCard = null;
                        secondCard = null;
                    }, 800);
                }
            }
            }

        )}
    }
}
//Github Push testing
shuffle(emojis);
createDiv();
