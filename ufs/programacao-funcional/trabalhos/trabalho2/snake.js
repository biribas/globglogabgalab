/* 
  Arquivo responsável por controlar todas as grandezas relacionadas a cobra.
  Observações:
    -> O nome da função enqueue agora é changeMoveDirection. Ela agora não empilha mais nada, altera a direção imdediatamente.
       Aliado a isso, a função nextMoves agora apenas retorna o proprio valor da propriedade 'moves'.

    -> As funções changeMoveDirection, nextHead e nextSnake foram alteradaas com intuito de maior legibilidade para os comentários.
       Suss operadores ternários foram substituidos por condicinais if.
    
    -> A informação da quantidade de colunas e linhas foram retiradas do objeto de State. Agora são definidas como constantes globais.

    -> As coordenadas iniciais da cabeça da cobra agora também são uma constante global.

    -> A função rndPos agora recebe 'snake' como parâmetro.
*/

const base = require('./base');
Object.getOwnPropertyNames(base).map(p => global[p] = base[p]);

// Constantes
const NORTH = { x: 0, y:-1 };
const SOUTH = { x: 0, y: 1 };
const EAST  = { x: 1, y: 0 };
const WEST  = { x:-1, y: 0 };
const COLUMNS = 20;
const ROWS = 14;
const initialCordinate = {x: 2, y: 2};

// Função currificada. Verifica se dois pontos com coordenadas (x, y) são iguais
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

/**  Funções de ações **/

// Verifica se a cabeça da cobra vai topar na comida no próximo frame.
const willEat   = state => pointEq(nextHead(state))(state.apple);

// Verifica se a cabeça da cobra vai topar no veneno no próximo frame.
const willBePoisoned = state => pointEq(nextHead(state))(state.poison);

// Verifica se, no pŕoximo frame, a cabeça da cobra vai colidir com alguma parte do corpo ou com as paredes
const willCrash = state => {
  const newHead = nextHead(state);  // Coordenada da cabeça no próximo frame
  const x = newHead.x;  // Coordenada x
  const y = newHead.y;  // Coordenada y
  return state.snake.find(pointEq(newHead)) || x < 0 || x >= COLUMNS || y < 0 || y >= ROWS || willBePoisoned(state);
}

// Função currificada. Verifica se o jogador escolheu uma direção diferente da atual.
const validMove = move => state =>
  state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0;


/** Próximos valores baseados no estado atual **/

// Atualiza direção da cobra.
const nextMoves = state => {
  if (state.snake.length === 0) // Se acabou de ocorrer um game over
    return [{...EAST}];  // Direção inicial será para o leste

  return state.moves;  // Retorna a direção atual
}

// Atualiza coordenadas da maçã. Se a cobra for come-la no próximo frame, uma nova maçã é gerada aleatoriamente. Se não, sua posição não muda.
const nextApple = state => willEat(state)   ? rndPos(state.snake) :
                           willCrash(state) ? rndPos(state.snake) : state.apple;

//Atualiza coordenadas do veneno. Se a cobra come a maça envenenada, gameover.
const nextPoison = state => willBePoisoned(state) ? rndPos(state.snake) :
                            willEat(state)        ? rndPos(state.snake) :
                            willCrash(state)      ? rndPos(state.snake) : state.poison;

// Atualiza coordenadas da cabeça da cobra
const nextHead  = state => {
  if (state.snake.length === 0)     // Se houve um game over
    return {...initialCordinate};   // Coordenada da cabeça volta a ser ao padrão

  return {
    x: state.snake[0].x + state.moves[0].x, // Atualiza a coordenada x
    y: state.snake[0].y + state.moves[0].y  // Atualiza a coordenada y
  };
}

// Atualiza coordenadas do corpo da cobra
const nextSnake = state => {
  if (willCrash(state)) // Se a cobra for topar nela mesma
    return [];  // Seu tamanho se torna igual a zero (utilizado como flag para piscar a tela)
  
  if (willEat(state)) // Se a cobra for comer a maçã
    return [nextHead(state)].concat(state.snake);  // Adiciona um bloco à cabeça da cobra

  return [nextHead(state)].concat(dropLast(state.snake)); // Adiciona um bloco à cabeça da cobra e remove o último (gera impressão de movimento) 
}

// Função recursiva. Gera uma maçã ou veneno em posição aleátoria em um lugar distinto ao corpo da cobra
const rndPos = snake => {
  const food = {
    x: rnd(0)(COLUMNS - 1),
    y: rnd(0)(ROWS - 1)
  };
  
  if (snake.find(pointEq(food)) === undefined)  // Se a maçã gerada não coincidir com o corpo da cobra
    return food;  // Retorna essa coordenada
  
  return rndPos(snake);  // Senão, outra coordenada para maçã é gerada
}


// Estado inicial
const initialState = () => ({
  moves: [EAST],                  // Direção da cobra
  snake: [{...initialCordinate}], // Coordenadas de todos os pontos do corpo da cobra. Organizada na forma de um array de objetos, cada objeto possuindo propriedades x e y
  apple: { x: 16, y: 2 },         // Coordenada da maçã
  poison: { x: 8, y: 9},          //Coordenada do veneno 
});

const next = spec({
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple,
  poison: nextPoison
});

// Enfileira a nova direção enviada pelo jogador com a direção antiga
const changeMoveDirection = (state, move) => {
  if (validMove(move)(state))   // Se o comando for válido
    return merge(state)({ moves: [{...move}] });  // Sobrescreve a propriedade 'moves' no objeto 'state' com o novo movimento
  
  return state;
}

module.exports = { EAST, NORTH, SOUTH, WEST, COLUMNS, ROWS, initialState, changeMoveDirection, next };
