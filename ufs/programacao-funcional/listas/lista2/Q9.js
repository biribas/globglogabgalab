const xor = (a, b) => a ^ b ? true : false
//const xor = (a, b) => (a && !b) || (!a && b)

const A = false
const B = true

console.log(xor(A, B))