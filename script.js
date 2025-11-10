// لعبة بسيطة X-O
const cells = Array.from(document.querySelectorAll('.cell'));
const statusArea = document.getElementById('statusArea');
const restartButton = document.getElementById('restartButton');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let running = true;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(){
  statusArea.textContent = running ? `اللاعب الحالي: ${currentPlayer}` : statusArea.textContent;
}

function checkWinner(){
  for (const combo of winningCombos){
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      running = false;
      statusArea.textContent = `انتهت اللعبة - الفائز: ${board[a]}`;
      return;
    }
  }
  if (!board.includes(null)) {
    running = false;
    statusArea.textContent = 'تعادل';
  }
}

function cellClick(e){
  const idx = Number(e.currentTarget.id);
  if (!running || board[idx]) return;
  board[idx] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  checkWinner();
  if (running){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function restart(){
  board = Array(9).fill(null);
  currentPlayer = 'X';
  running = true;
  cells.forEach(c => c.textContent = '');
  updateStatus();
}

cells.forEach(c => c.addEventListener('click', cellClick));
restartButton.addEventListener('click', restart);

updateStatus();
