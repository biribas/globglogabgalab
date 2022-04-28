// Q4. Soma dos n primeiros numeros naturais.
/*
 Formulação recursiva
  f(1) = 1
  f(n) = n + f(n -1)
*/ 

const f = n => n < 1 || !Number.isInteger(n) ? "Valor inválido" : fAux(n);

const fAux = n => n == 1 ? 1 : n + fAux(n - 1);

console.log(f(6));