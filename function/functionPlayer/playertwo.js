// const { reset } = require("nodemon");

let tables = Array.from(document.querySelectorAll('.table'));
const Reset = document.querySelector('.reset');
const contentPlayerWin = document.querySelector('.contentPlayerWin');
const buttonWin = document.querySelector('.buttonWin');
const textWin = document.querySelector('.TextWin');
const Player1 = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`;
const Player2 = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-slash-2"><circle cx="12" cy="12" r="10"/><path d="M22 2 2 22"/></svg>';
let firstMove = Player1;
let spacesTable = Array(9).fill(null);

const StartGame = () => {
    tables.forEach(table => table.addEventListener('click', TableClick))
}

function TableClick(e){
    const id = e.target.id

   
    if(!spacesTable[id]){
        spacesTable[id] = firstMove;
        e.target.innerHTML = firstMove;

        if (checkWin(firstMove)) {
            highlightWinningCombination()
            setTimeout(() => {
                conquerTable(firstMove);
     
            },1000);

            setTimeout(() => {
                 
                contentPlayerWin.style.display ='flex';
                const winnerText = firstMove === Player1 ? "Player 1" : "Player 2";
                textWin.innerHTML = `${winnerText} wins!`;
     
            },2000);
                
            buttonWin.addEventListener('click', () => {
                contentPlayerWin.style.display = "none";
                ResetGame();
            });
        } else if (isDraw()) {
            // Check if the game is a draw
            setTimeout(() => {
                textWin.innerText = `It's a draw!`;
                contentPlayerWin.style.display = 'flex';
            }, 500);

            buttonWin.addEventListener('click', () => {
                contentPlayerWin.style.display = "none";
                ResetGame();
            });
        }
        else{
            firstMove = firstMove == Player1 ? Player2 : Player1
        }

        

    }
}


const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [1, 6, 11],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]   
  ];

  function conquerTable(winningPlayer) {
    tables.forEach((table, index) => {
        spacesTable[index] = winningPlayer;
        table.innerHTML = winningPlayer;
        table.style.backgroundColor = '#C5630C';  // Optional: highlight cells in orange
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


// Highlight the winning combination cells
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
    spacesTable.fill(null)

    tables.forEach(table => {
        table.innerHTML = '';
        table.style.backgroundColor = '';
    })

    firstMove = Player1;
}

StartGame();    