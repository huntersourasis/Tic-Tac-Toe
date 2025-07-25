const canvasDivs = document.querySelectorAll(".canvas-divs");
const resetBtn = document.querySelector(".rst-btn");
const winBoard = document.querySelector(".win-output");

let count = 0;
let gameEnded = false;

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
];

function ensureWin() {
    const values = Array.from(canvasDivs).map(div => div.innerHTML);

    for (const [a, b, c] of winPatterns) {
        if (values[a] && values[a] === values[b] && values[b] === values[c]) {
            winBoard.value = `${values[a]} Wins`;
            gameEnded = true;
            highlightWinner([a, b, c]);
            return;
        }
    }

    if (count === 9 && !gameEnded) {
        winBoard.value = "It's Draw";
        gameEnded = true;
    }
}
function highlightWinner(indices) {
    indices.forEach(i => {
        canvasDivs[i].style.backgroundColor = "lightgreen";
    });
}

canvasDivs.forEach((canvas) => {
    canvas.addEventListener("click", () => {
        if (canvas.innerHTML !== "" || gameEnded) return;
        canvas.innerHTML = count % 2 === 0 ? "X" : "O";
        count++;
        ensureWin();
    });
});

resetBtn.addEventListener("click", () => {
    canvasDivs.forEach(div => {
        div.innerHTML = "";
        div.style.backgroundColor = ""; // Remove highlight
    });
    count = 0;
    gameEnded = false;
    winBoard.value = "";
});
