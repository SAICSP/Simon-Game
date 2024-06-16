let gameSeq = [];
let userSeq = [];

let btns = ["red", "aqua", "yellow", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highScoreElement = document.getElementById("highScore");

document.getElementById("startButton").addEventListener("click", function () {
    if (!started) {
        started = true;
        console.log("The game is started now");
        levelUp();
    }
});


document.getElementById("restartButton").addEventListener("click", function () {
    location.reload(); 
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 550);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(Idx) {
    if (userSeq[Idx] === gameSeq[Idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let highScore = localStorage.getItem('highScore') || 0;

        highScoreElement.textContent = `High Score is ${highScore}`;

        if (level > highScore) {
            highScore = level;
            highScoreElement.textContent = `High Score is ${highScore}`;
            localStorage.setItem('highScore', highScore);
        }

        h2.innerHTML = `Game Over ! Your Score was <b> ${level}</b> <br> Click Start to play again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "black";
        }, 500);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function resetGame() {
    level = 0;
    userSeq = [];
    gameSeq = [];
    started = false;
}
