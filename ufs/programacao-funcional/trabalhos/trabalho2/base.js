/* 
  Arquivo que contém funções de apoio para o jogo
  Observações:
    -> A função spec teve sua arrumação alterada com o intuito de maior legibilidade para os comentários
    -> Alguns nomes de parâmetros foram alterados também com o intuito de maior legibilidade
*/

const adjust    = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)

// Elimina o primeiro elemento do array recebido como paramentro
const dropFirst = xs => xs.slice(1)

// Elimina o ultimo elemento de um array recebido como parâmetro
const dropLast  = xs => xs.slice(0, xs.length - 1)

const id        = x => x
const k         = x => y => x
const map       = f => xs => xs.map(f)
const mapi      = f => xs => xs.map((x, i) => f(x)(i))

// Função currificada. Mescla dois objetos em um só
const merge     = o1 => o2 => Object.assign({}, o1, o2)

// Função currificada. Se x > 0, retorna um valor igual a y % x. Se não, retorna ((y % x) + x) % x. Função ultilizada nas para fazer a cobra atravessar uma borda da arena e surgir na outra.
const mod       = x => y => ((y % x) + x) % x

// Função currificada. Cria um par { propriedade : valor } a partir dos parametros recebidos
const objOf     = key => value => ({ [key]: value });

// Composição de funções
const pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x);

// Função currificada. Retorna o valor relacionado à certa propriedade (key) de um objeto
const prop      = key => object => object[key];

// Função currificada. Retorna um array preenchido com os números presentes no intervalo [n, m)
const range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i);

// Função currificada.
const rep       = c => n => map(k(c))(range(0)(n));

// Função currificada. Gera um número inteiro aleatório entre min e max
const rnd       = min => max => Math.floor(Math.random() * max) + min

// Função que retorna o novo State da cobra
const spec      = nextState => currentState => {
  return Object.keys(nextState)  // Retorna um array com todas as propriedades do objeto 
    .map(key => {     // Para cada propriedade presente no array
        const value = nextState[key](currentState); // Retorno da função relacionada a cada valor de 'key' quando é passado currentState como parâmetro.
        return objOf(key)(value); // Remapeia as casas do array com pares {propriedade: valor}.
    })
    .reduce((acc, o) => Object.assign(acc, o));  // Unifica o array de objetos em um único objeto.
}

module.exports = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec }
