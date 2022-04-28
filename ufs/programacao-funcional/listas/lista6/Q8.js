// Q8. Quociente da divisão entre dois números inteiros positivos fornecidos, nn e mm.
/*
 Formulação recursiva
  f(m, n) = f(m, n, 0)
  f(m, n, acc) = acc, se m < n
  f(m, n, acc) = f(m - n, n, acc + 1), se m > n
*/

const quociente = (m, n) => m < 0 || n <= 0 || !Number.isInteger(n) || !Number.isInteger(m) ? "Valor inválido" : quocienteAux(m, n, 0);

const quocienteAux = (m, n, acc) => m < n ? acc : quocienteAux(m - n, n, acc + 1);

console.log(quociente(10, 3));