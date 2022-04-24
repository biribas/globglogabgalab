function number(a, b, c)
{
    const M = (a + b + c) / 3
    return (a > M && b > M) || (a > M && c > M) || (b > M && c > M) ? 2 : (a == b && b == c ? 0 : 1) 
}

const A = 3
const B = 2
const C = 1

console.log(number(A, B, C))