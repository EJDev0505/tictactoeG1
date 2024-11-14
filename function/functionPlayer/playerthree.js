let tables = Array.from(document.querySelectorAll('.table'));
const Reset = document.querySelector('.reset');
const contentPlayerWin = document.querySelector('.contentPlayerWin');
const buttonWin = document.querySelector('.buttonWin');
const textWin = document.querySelector('.TextWin');

const players = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`, 
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-slash-2"><circle cx="12" cy="12" r="10"/><path d="M22 2 2 22"/></svg>', 
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`
]; // Players array for 3 players
let firstMove = players[0];
let spacesTable = Array(16).fill(null); // 4x4 grid (16 spaces)

const StartGame = () => {
    tables.forEach(table => table.addEventListener('click', TableClick));
}

function TableClick(e) {
    const id = e.target.id;

    // If the cell is not already filled
    if (!spacesTable[id]) {
        spacesTable[id] = firstMove;
        e.target.innerHTML = firstMove;

        if (checkWin(firstMove)) {
            highlightWinningCombination();
            setTimeout(() => {
                conquerTable(firstMove);
            }, 1000);

            setTimeout(() => {
                // Display the player number that won
                const playerNumber = players.indexOf(firstMove) + 1; // Player 1, 2, or 3
                textWin.innerHTML = `Player ${playerNumber} wins!`;
                contentPlayerWin.style.display = 'flex';
            }, 2000);

            buttonWin.addEventListener('click', () => {
                contentPlayerWin.style.display = "none";
                ResetGame();
            });

        } else if (isDraw()) {
            setTimeout(() => {
                textWin.innerText = `It's a draw!`;
                contentPlayerWin.style.display = 'flex';
            }, 500);

            buttonWin.addEventListener('click', () => {
                contentPlayerWin.style.display = "none";
                ResetGame();
            });

        } else {
            // Switch turns between Player1, Player2, and Player3
            let currentPlayerIndex = players.indexOf(firstMove);
            firstMove = players[(currentPlayerIndex + 1) % players.length];
        }
    }
}

const winningCombinations = [
    // Rows
    [0, 1, 2],
    [1, 2, 3],
    [4, 5, 6],
    [5, 6, 7],
    [8, 9, 10],
    [9, 10, 11],
    [12, 13, 14],
    [13, 14, 15],
    
    // Columns
    [0, 4, 8],
    [4, 8, 12],
    [1, 5, 9],
    [5, 9, 13],
    [2, 6, 10],
    [6, 10, 14],
    [3, 7, 11],
    [7, 11, 15],
    
    // Diagonals
    [0, 5, 10],
    [5, 10, 15],
    [1, 6, 11],
    [4, 9, 14],
    [2, 5, 8],
    [7, 10, 13],
    [3, 6, 9],
    [6, 9, 12],
  ];
function conquerTable(winningPlayer) {
    tables.forEach((table, index) => {
        spacesTable[index] = winningPlayer;
        table.innerHTML = winningPlayer;
        table.style.backgroundColor = '#C5630C'; // Highlight cells in orange
    });
}

function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => spacesTable[index] === player)
    );
}

function isDraw() {
    return spacesTable.every(cell => cell !== null) && !checkWin(firstMove);
}

// Highlight the winning combination cells in orange
function highlightWinningCombination() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => spacesTable[index] === firstMove)) {
            combination.forEach(index => {
                tables[index].style.backgroundColor = '#C5630C';
            });
        }
    });
}

Reset.addEventListener('click', ResetGame);

function ResetGame() {
    spacesTable.fill(null);

    tables.forEach(table => {
        table.innerHTML = '';
        table.style.backgroundColor = ''; // Reset color to default
    });

    firstMove = players[0]; // Reset to the first player
}

StartGame();


