const cart1 = [
    {name: 'Caneta', qtd: 10, price: 7.99, fragile: true},
    {name: 'Impressora', qtd: 1, price: 649.50, fragile: true},
    {name: 'Caderno', qtd: 4, price: 27.10, fragile: false},
    {name: 'Lapis', qtd: 3, price: 5.82, fragile: false},
    {name: 'Tesoura', qtd: 1, price: 19.20, fragile: true},
]

const total = cart => cart.map(item => item.qtd * item.price).reduce((acc, x) => acc + x, 0)

const fragile = cart => total(cart.filter(item => item.fragile))

const exchange = (e=1) => t => e * t

const discount = (p=0) => t => (100 - p) * t / 100

const firstLetter = cart => (letter='') => letter == '' ? cart : cart.filter(x => x.name[0].toLowerCase() == letter.toLowerCase())

const composition = (...fns) => letter => fns.reduce((acc, f) => f(acc), letter)

const calculate = cart => calc => e => d => composition(
    firstLetter(cart), 
    calc, 
    exchange(e), 
    discount(d)
)

/*
How to use:
calculate(shopping cart)(total itens/fragile itens)(exchange rate)(discount in %)(first letter)
*/

const res1 = calculate(cart1)(total)(5)(10)()
const res2 = calculate(cart1)(fragile)()(5)()
const res3 = calculate(cart1)(total)()()()
const res4 = calculate(cart1)(total)()()('t')

console.log(`Valor total com cambio de 5x e 10% de desconto é ${res1}!`)
console.log(`Valor total dos itens frágeis com 5% de desconto é ${res2}!`)
console.log(`Valor total é ${res3}!`)
console.log(`Valor total dos itens que começam com \'T\' é ${res4}`)
