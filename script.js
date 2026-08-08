const emoji = ["🤤","👅","🫦","😁","💀","😂","🥵","🤡"];

const emojis = [...emoji,...emoji];

const board = document.getElementById("board");


function classCard(card){
    card.classList.add("card");
}

// function addEmoji(){
//     card.appendchild(emoji);
// }

function addCard(card){
    board.appendChild(card);
}

function addFront(card){
    const front = document.createElement("div");
    card.appendChild(front);
    front.classList.add("front");
    return front;
}

function addBack(card){
    const back = document.createElement("div");
    card.appendChild(back)
    back.classList.add("back");
    return back;
}

function createDiv(){
for(let  i = 0; i<16; i++){
    const card = document.createElement("div");
    classCard(card);
    addCard(card);
    const front = addFront(card);
    const back = addBack(card);
    }
}

createDiv();
