let tables = Array.from(document.querySelectorAll('.table'));
const Reset = document.querySelector('.reset');
const contentPlayerWin = document.querySelector('.contentPlayerWin');
const buttonWin = document.querySelector('.buttonWin');
const textWin = document.querySelector('.TextWin');

const players = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`, 
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-slash-2"><circle cx="12" cy="12" r="10"/><path d="M22 2 2 22"/></svg>', 
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-off"><path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/></svg>`
];// Players array for 4 players
let firstMove = players[0];
let spacesTable = Array(25).fill(null);

const StartGame = () => {
    tables.forEach(table => table.addEventListener('click', TableClick));
}

function TableClick(e){
    const id = e.target.id;

    if (!spacesTable[id]) {
        spacesTable[id] = firstMove;
        e.target.innerHTML = firstMove;

        if (checkWin(firstMove)) {
            highlightWinningCombination();
            setTimeout(() => {
                conquerTable(firstMove);
            }, 1000);

            setTimeout(() => {
                const playerNumber = players.indexOf(firstMove) + 1;
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
            // Rotate to the next player
            let currentPlayerIndex = players.indexOf(firstMove);
            firstMove = players[(currentPlayerIndex + 1) % players.length];
        }
    }
}

const winningCombinations = [
    // Rows
    [0, 1, 2, 3], [1, 2, 3, 4],
    [5, 6, 7, 8], [6, 7, 8, 9],
    [10, 11, 12, 13], [11, 12, 13, 14],
    [15, 16, 17, 18], [16, 17, 18, 19],
    [20, 21, 22, 23], [21, 22, 23, 24],
    
    // Columns
    [0, 5, 10, 15], [5, 10, 15, 20],
    [1, 6, 11, 16], [6, 11, 16, 21],
    [2, 7, 12, 17], [7, 12, 17, 22],
    [3, 8, 13, 18], [8, 13, 18, 23],
    [4, 9, 14, 19], [9, 14, 19, 24],
    
    // Diagonals
    [0, 6, 12, 18], [1, 7, 13, 19],
    [5, 11, 17, 23], [6, 12, 18, 24],
    [3, 7, 11, 15], [4, 8, 12, 16],
    [8, 12, 16, 20], [9, 13, 17, 21]
];

function conquerTable(winningPlayer) {
    tables.forEach((table, index) => {
        spacesTable[index] = winningPlayer;
        table.innerHTML = winningPlayer;
        table.style.backgroundColor = '#C5630C';
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
        table.style.backgroundColor = '';
    });

    firstMove = players[0];
}

StartGame();
