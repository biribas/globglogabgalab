function howManyEqual (a, b, c)
{
    return a == b && b == c ? 3 : ((a == b || b == c) ? 2 : 0)
}

const A = 2
const B = 2
const C = 2

console.log(howManyEqual(A, B, C))