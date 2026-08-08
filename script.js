const emoji = ["🤤","👅","🫦","😁","💀","😂","🥵","🤡"];

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

function createDiv(){
for(let  i = 0; i<16; i++){
    const card = document.createElement("div");
    classCard(card);
    addCard(card);
    }
}


createDiv();
