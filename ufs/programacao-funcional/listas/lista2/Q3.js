const isTriangle = (a, b, c) => {
    if ((a + b > c) && (a + c > b) && (b + c > a))
    {
        return 'É um triângulo'
    }
    return 'Não é um triângulo'  
}

const A = 3
const B = 4
const C = 5

console.log(isTriangle(A, B, C))