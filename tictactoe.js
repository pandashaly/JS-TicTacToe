// const prompt = require('prompt-sync')();

// let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
// let emojis = [
//     "🥰", "😊", "😎",
//     "🐶", "🐰", "🦊",
//     "🐼", "🍄", "🎀"];

// let randomEmoji = emojis[Math.floor(Math.random() *emojis.length)];
// console.log("       Tic-Tac-Toe", randomEmoji);
// let gameActive = true; // Keeps game running
// let currentPlayer = "p1";

// //console.log(`${emojis}`); //to print the array of emojis
// //Math.random() - generates ramndom number between 0 and 1
// //Math.random() * emojis.length scales it to the array’s length
// //Math.floor(...) rounds it down to get a valid array index

// function playerEmoji()
// {
//     let shuffled = [...emojis].sort(() => Math.random() - 0.5);
//     return [shuffled[0], shuffled[1]];
// }
// let [p1, p2] = playerEmoji();

// function printBoard()
// {
//     console.log(`
//         ${board[0]} | ${board[1]} | ${board[2]}
//         ---------
//         ${board[3]} | ${board[4]} | ${board[5]}
//         ---------
//         ${board[6]} | ${board[7]} | ${board[8]}
//         `)
// }
// function errorChecks(pos)
// {
//     if (isNaN(pos) || pos < 0 || pos > 8)
//     {
//         console.log("Invalid Move! Enter a number between 0 and 8.");
//         return false;
//     }
    
//     if (board[pos] != " ")
//     {
//         console.log("Cell already taken, chose another one.");
//         return false;
//     }
// }
// function handleMove(input)
// {
//     let token = input.split("-");
//     let player = token[0];
//     let pos = parseInt(token[1]);

//     errorChecks(pos);

//     if (player === "p1")
//         board[pos] = p1;
//     else if (player === "p2")
//         board[pos] = p2;
//     else
//         console.log("Invalid player! Use 'p1' or 'p2'.");
//     return false;
// }
// console.log(`P1 ${p1}`);
// console.log(`P2 ${p2}`);
// printBoard();

// // Get the move from command-line arguments
// const args = process.argv.slice(2); // Ignore first two elements (Node.js path & script path)

// if (args.length > 0) {
//     handleMove(args[0]); // Use the first argument as input
// } else {
//     console.log("Please enter a move (e.g., p1-4).");
// }

// function gameLoop()
// {
//     while (gameActive) {
//         let move = prompt(`Enter move (e.g., p1-4): `);
//         handleMove(move);
//     }
// }

// gameLoop();

const prompt = require('prompt-sync')();

// Initialize game board
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// List of emojis for random selection
let emojis = [
    "🥰", "😊", "😎",
    "🐶", "🐰", "🦊",
    "🐼", "🍄", "🎀"
];

// Pick one random emoji for the game theme
let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
console.log(`       Tic-Tac-Toe ${randomEmoji}`);

// Select two unique emojis for Player 1 and Player 2
function playerEmoji() {
    let shuffled = [...emojis].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
}
let [p1, p2] = playerEmoji();

let gameActive = true; // Keeps game running
let currentPlayer = "p1"; // Start with Player 1

// Function to print the game board
function printBoard() {
    console.log(`
      ${board[1]} | ${board[2]} | ${board[3]}
      ---------
      ${board[4]} | ${board[5]} | ${board[6]}
      ---------
      ${board[7]} | ${board[8]} | ${board[9]}
    `);
}

// Check if a move is valid
function errorChecks(pos) {
    if (isNaN(pos) || pos < 1 || pos > 9) {
        console.log("❌ Invalid move! Enter a number between 1 and 9.");
        return false;
    }
    if (board[pos] !== " ") {
        console.log("❌ Cell already taken, choose another one.");
        return false;
    }
    return true;
}

// Function to handle player moves
function handleMove(input) {
    let token = input.split("-");
    let player = token[0];
    let pos = parseInt(token[1]);

    if (!errorChecks(pos)) return false; // Stop if move is invalid

    // Assign the correct emoji to the board
    if (player === "p1") {
        board[pos] = p1;
    } else if (player === "p2") {
        board[pos] = p2;
    } else {
        console.log("❌ Invalid player! Use 'p1' or 'p2'.");
        return false;
    }

    printBoard(); // Show updated board
    return true;
}

// Check for winning condition
function checkWin() {
    const winConditions = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] !== " " && board[a] === board[b] && board[b] === board[c]) {
            console.log(`🎉 Player ${board[a]} wins!`);
            gameActive = false;
            return true;
        }
    }
    return false;
}

// Check for a draw (if all spaces are filled)
function checkDraw() {
    if (board.every(cell => cell !== " ")) {
        console.log("⚖️ It's a draw!");
        gameActive = false;
        return true;
    }
    return false;
}

// Main game loop
function gameLoop() {
    console.log(`P1: ${p1}`);
    console.log(`P2: ${p2}`);
    printBoard();

    while (gameActive) {
        let move = prompt(`Enter move (e.g., p1-4): `);
        if (handleMove(move)) {
            if (checkWin() || checkDraw()) break; // Stop game if won or drawn

            // Switch players after a valid move
            currentPlayer = currentPlayer === "p1" ? "p2" : "p1";
        }
    }
}

// Start the game
gameLoop();
