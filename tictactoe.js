const prompt = require('prompt-sync')();

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let emojis = ["🥰", "😊", "😎", "🐶", "🐰", "🦊", "🐼", "🍄", "🎀"];
let randomEmoji = emojis[Math.floor(Math.random() *emojis.length)];
console.log("       Tic-Tac-Toe", randomEmoji);

function playerEmoji()
{
    let shuffled = [...emojis].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
}
let [p1, p2] = playerEmoji();
let gameActive = true; // Keeps game running
let currentPlayer = "p1"; //start with p1

function printBoard(showNumbers = false)
{
    if (showNumbers) {
        console.log(`
         1 | 2 | 3
        ---------
         4 | 5 | 6
        ---------
         7 | 8 | 9
        `);
    }
    else
    {
        console.log(`
        ${board[1]} | ${board[2]} | ${board[3]}
        ---------
        ${board[4]} | ${board[5]} | ${board[6]}
        ---------
        ${board[7]} | ${board[8]} | ${board[9]}
        `)
    }
}

function errorChecks(pos)
{
    if (isNaN(pos) || pos < 1 || pos > 9)
    {
        console.log("Invalid Move! Enter a number between 1 and 9.");
        return false;
    }
    
    if (board[pos] != " ")
    {
        console.log("Cell already taken, chose another one.");
        return false;
    }
}

function handleMove(input)
{
    if (input === "q")
    {
        console.log("Thank you for playing! Bye!");
        process.exit(0);
    }
    let token = input.split("-");
    let player = token[0];
    let pos = parseInt(token[1]);

    if (!errorChecks(pos)) false;

    if (player === "p1")
        board[pos] = p1;
    else if (player === "p2")
        board[pos] = p2;
    else
    {
        console.log("Invalid player! Use 'p1' or 'p2'.");
        return false;
    }
    
    printBoard();
    return true;
}

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
        console.log("It's a draw!");
        gameActive = false;
        return true;
    }
    return false;
}

const args = process.argv.slice(2); // Ignore first two elements (Node.js path & script path)

if (args.length > 0) {
    handleMove(args[0]); // Use the first arg as input
} else {
    console.log("Please enter a move (e.g., p1-4) or press 'q' to exit game.");
}

function gameLoop()
{
    console.log(`P1 ${p1}`);
    console.log(`P2 ${p2}`);
    console.log("\nBoard positions:");
    printBoard(true);
    console.log("\nGame starts now!");
    printBoard();
    while (gameActive) {
        let move = prompt(`${currentPlayer}'s${currentPlayer === "p1" ? p1 : p2} turn -> `);
        if (handleMove(move))
            if (checkWin() || checkDraw()) break;
        currentPlayer = currentPlayer === "p1" ? "p2" : "p1";
    }
}

gameLoop();

//NOTES:
//console.log(`${emojis}`); //to print the array of emojis
//Math.random() - generates ramndom number between 0 and 1
//Math.random() * emojis.length scales it to the array’s length
//Math.floor(...) rounds it down to get a valid array index
