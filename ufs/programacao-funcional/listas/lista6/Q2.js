// Q2. N-ésimo termo da sequência {0,1,1,2,3,5,8,13,21,34,55,...}.
/*
 Formulação recursiva
  f(1) = 0
  f(2) = 1
  f(n) = f(n - 1) + f(n - 2), para n>= 3
*/

const fibonacci = n => n < 1 || !Number.isInteger(n) ? "Valor inválido" : fAux(n);

const fibonacciAux = n => n < 3 ? n - 1 : fAux(n - 1) + fAux(n - 2);

console.log(f(10));