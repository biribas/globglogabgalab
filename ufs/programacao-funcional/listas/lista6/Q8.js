// Q8. Quociente da divisão entre dois números inteiros positivos fornecidos, nn e mm.
/*
 Formulação recursiva
  f(m, n) = f(m, n, 0)
  f(m, n, acc) = acc, se m < n
  f(m, n, acc) = f(m - n, n, acc + 1), se m > n
*/

const f = (m, n) => m < 0 || n <= 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : fAux(m, n, 0);

const fAux = (m, n, acc) => m < n ? acc : fAux(m - n, n, acc + 1);

console.log(f(10, 3));