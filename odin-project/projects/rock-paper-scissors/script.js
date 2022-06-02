const LIST = ['rock', 'paper', 'scissors'];

function computerPlay () {
  const index = Math.floor(Math.random() * 3);
  return LIST[index];
}