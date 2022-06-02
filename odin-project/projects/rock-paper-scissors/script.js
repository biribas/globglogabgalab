const LIST = ['Rock', 'Paper', 'Scissors'];
var computerScore = 0;
var playerScore = 0;

function computerPlay() {
  return Math.floor(Math.random() * 3);
}

function playRound(playerSelection, computerSelection) {
  const value = playerSelection - computerSelection;
  
  if (value === 0)
    return 'It\'s a tie!';
  
  playerSelection = LIST[playerSelection];
  computerSelection = LIST[computerSelection];
  
  if (value === 2 || value === -1) {
    computerScore++;
    return `You Lose the round! ${computerSelection} beats ${playerSelection}`;
  }
  
  playerScore++;
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
  for (let i = 1; i <= 5; i++) {
    console.log(`Round ${i}/5`);
    let playerSelection;
    do {
      const input = prompt('Rock, paper or scissors?');
      playerSelection = validateInput(input);
    } while (playerSelection === -1);

    const computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
  }

  console.log('------------------------------');
  console.log(computerScore > playerScore? 'You lose :(' : computerScore < playerScore ? 'You win :)' : 'It\'s a tie');
}

document.addEventListener('DOMContentLoaded', game);