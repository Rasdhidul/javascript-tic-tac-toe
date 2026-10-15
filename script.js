
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let pattern of winningPatterns) {
        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return true;
        }
    }

    return false;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = Array.from(cells).indexOf(clickedCell);

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = "Player " + currentPlayer + " wins!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = "Player " + currentPlayer + "'s turn";
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function(cell) {
        cell.textContent = "";
    });

    statusText.textContent = "Player X's turn";
}

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
