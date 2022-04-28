// Q3. Encontrar o último elemento de uma lista qualquer passada.

/* 
 Formulação recursiva
  f([]) = undifined
  f([a1]) = a1
  f([a1, a2, ...an]) = f([a2, ...an])
*/

const f = ([a1, ...an]) => !a1 ? "Lista vazia" : fAux([a1, ...an]);

const fAux = ([a1, ...an]) => an.length == 0 ? a1 : fAux(an);

const lista = [1, 4, 5, 2, 3];

console.log(f(lista));