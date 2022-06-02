const LIST = ['Rock', 'Paper', 'Scissors'];

function computerPlay() {
  return Math.floor(Math.random() * 3);
}

function playRound(playerSelection, computerSelection) {
  const value = playerSelection - computerSelection;
  
  if (value === 0)
    return 'It\'s a tie!';
  
  playerSelection = LIST[playerSelection];
  computerSelection = LIST[computerSelection];
  
  if (value === 2 || value === -1)
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
  
  return `You Win! ${playerSelection} beats ${computerSelection}`;
}

function validateInput(element) {
  if (element === null) {
    console.log('Invalid input');
    return -1;
  }

  element = element.trim();
  const index = LIST.findIndex(e => e.toLowerCase() === element.toLowerCase());
  
  if (index === -1) {
    console.log('Invalid input');
  }

  return index;
}

function game() {
  for (let i = 0; i < 5; i++) {
    let playerSelection;
    do {
      const input = prompt('Rock, paper or scissors?');
      playerSelection = validateInput(input);
    } while (playerSelection === -1);

    const computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
  }
}

game();
