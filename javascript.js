let boxes =document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// to check whose turn is now O/X
let turnO =true;  // playerX = false, playerO = true
let count = 0;  // to draw game

//to store winning pattern we use 2-D array
const winningPtrn = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = "Game Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was clicked..");
        if (turnO){ // player O
            box.innerText = "O";
            turnO = false;
        }
        else{      // player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningPtrn) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                // console.log("Winner is ", pos1val);
                showWinner(pos1val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);