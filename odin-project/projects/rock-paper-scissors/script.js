const buttons = document.querySelectorAll('.button');
const icons = [...buttons].map(e => e.textContent);
const moves = [...buttons].map(e => e.dataset.move);

const phrase = document.querySelector('#text');

const player = {
  move: document.querySelector('#player > .move-box'),
  score: document.querySelector('#player span')
}

const computer = {
  move: document.querySelector('#computer > .move-box'),
  score: document.querySelector('#computer span')
}

function computerPlay() {
  return Math.floor(Math.random() * 3);
}

function checkEnd () {
  if (+player.score.innerText === 5 || +computer.score.innerText === 5)
    buttons.forEach(button => button.removeEventListener('click', playRound));
}

function refree(result, playerMove, computerMove) {
  player.move.classList.remove('win', 'lose');
  computer.move.classList.remove('win', 'lose');

  player.move.classList.add('animation');
  computer.move.classList.add('animation');
  
  const draw = result === 0;
  const playerWins = result === -2 || result === 1;

  if (draw) 
    phrase.innerText = "It's a tie!";

  else if (playerWins) {
    phrase.innerText = `You Win! ${playerMove} beats ${computerMove} :)`;
    player.score.innerText = +player.score.innerText + 1;
    player.move.classList.add('win');
    computer.move.classList.add('lose');
  }
  
  else {
    phrase.innerText = `You Lose! ${computerMove} beats ${playerMove} :(`;
    computer.score.innerText = +computer.score.innerText + 1; 
    player.move.classList.add('lose');
    computer.move.classList.add('win');
  }

  checkEnd();
}

function playRound(e) {
  const playerIndex = moves.indexOf(e.target.dataset.move);
  const playerIcon = icons[playerIndex];
  const playerMove = moves[playerIndex];

  const computerIndex = computerPlay();
  const computerIcon = icons[computerIndex];
  const computerMove = moves[computerIndex];

  const result = playerIndex - computerIndex;
  
  player.move.innerText = playerIcon;
  computer.move.innerText = computerIcon;

  refree(result, playerMove, computerMove);
}

function removeTransition(e) {
  this.classList.remove('animation')
}

function game() {
  buttons.forEach(button => button.addEventListener('click', playRound));
  player.move.addEventListener('transitionend', removeTransition);
  computer.move.addEventListener('transitionend', removeTransition);
}

document.addEventListener('DOMContentLoaded', game);
