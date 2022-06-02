const LIST = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
  const index = Math.floor(Math.random() * 3);
  return LIST[index];
}

function playRound(playerSelection, computerSelection) {
  const playerIndex = findIndex(playerSelection);
  const computerIndex = findIndex(computerSelection);

  const value = playerIndex - computerIndex;
  
  if (value === 0)
    return 'It\'s a tie!';
  
  playerSelection = LIST[playerIndex];
  
  if (value === 2 || value === -1)
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
  
  return `You Win! ${playerSelection} beats ${computerSelection}`;
}

function findIndex(element) {
  return LIST.findIndex(e => e.toLowerCase() === element.toLowerCase());
}

const playerSelection = 'rock';
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection));