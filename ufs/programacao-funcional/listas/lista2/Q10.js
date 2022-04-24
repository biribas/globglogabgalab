const citation = name => name.split(' ', 2).reverse().join(', ')

const s = 'Harry Potter'

console.log(citation(s))