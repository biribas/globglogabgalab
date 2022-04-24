function isTriangle(a, b, c)
{
    if ((a + b > c) && (a + c > b) && (b + c > a))
    {
        return true
    }

    return false
}

function triangleType(a, b, c) 
{
    if (a == b && b == c)
    {
        return 'Equilátero'
    }
    
    if (a == b || b == c || a == c)
    {
        return 'Isóceles'
    }

    return 'Escaleno'
}

const A = 3
const B = 4
const C = 5

resultado = isTriangle(A, B, C) ? triangleType(A, B, C) : "Não é um triângulo"

console.log(resultado)