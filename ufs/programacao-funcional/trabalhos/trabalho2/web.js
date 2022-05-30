const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');

// Estado é mutável
let state = initialState();

// Posicionamento
const x = c => Math.round(c * canvas.width / COLUMNS);
const y = r => Math.round(r * canvas.height / ROWS);

// Desenho do laço do jogo
const draw = () => {
  const scorePoints   = state.snake.length-1
  const defaultColor  = 'rgb(102,0,204)'   // roxo
  const pinkColor     = 'rgb(219,112,147)' // rosa
  const blueColor     = 'rgb(32,178,170)'  // azul
  const goldColor     = 'rgb(255,215,0)'   // dourado

  // limpa
  ctx.fillStyle = '#232323';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenha cobra
  ctx.fillStyle = scorePoints>=0 && scorePoints<2?  defaultColor:
                  scorePoints>=2 && scorePoints<5?  pinkColor:
                  scorePoints>=5 && scorePoints<8?  blueColor:
                  scorePoints>=8?                   goldColor:defaultColor;
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

  // desenha maçãs
  ctx.fillStyle = 'rgb(255,50,0)';
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

  // desenha veneno
  ctx.fillStyle = 'rgb(0,255,0)';
  ctx.fillRect(x(state.poison.x), y(state.poison.y), x(1), y(1))

  // pontuacao do jogo
  score.innerHTML = `Score: ${scorePoints}`

  // adiciona choque
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// Eventos do teclado
window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'w': case 'h': case 'ArrowUp':    state = changeMoveDirection(state, NORTH); break;
      case 'a': case 'j': case 'ArrowLeft':  state = changeMoveDirection(state, WEST);  break;
      case 's': case 'k': case 'ArrowDown':  state = changeMoveDirection(state, SOUTH); break;
      case 'd': case 'l': case 'ArrowRight': state = changeMoveDirection(state, EAST);  break;
    }
  })

/**
 * LAÇO PRINCIPAL DO JOGO
 */

 const step = t1 => t2 => {
  if (state.snake.length <= 2) {
    if (t2 - t1 > 200 ) {
      state = next(state);
      draw();
      window.requestAnimationFrame(step(t2));
    } else {
      window.requestAnimationFrame(step(t1));
    }
    // incremento de velocidade a medida que a cobra aumenta
  } else if ((state.snake.length > 2) && (state.snake.length <= 5)){
    if (t2 - t1 > 150 ) {
      state = next(state);
      draw();
      window.requestAnimationFrame(step(t2));
    } else {
      window.requestAnimationFrame(step(t1));
    }
  } else if (state.snake.length > 5){
    if (t2 - t1 > 100 ) {
      state = next(state);
      draw();
      window.requestAnimationFrame(step(t2));
    } else {
      window.requestAnimationFrame(step(t1));
    }

  }
  
}


draw(); window.requestAnimationFrame(step(0))
