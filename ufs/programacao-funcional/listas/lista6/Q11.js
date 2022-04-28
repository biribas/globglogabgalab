/* 
   Q11. Considere o problema de gerar o montante acumulado de casos de uma doença qualquer. 
   Como entrada, existe uma sequência de valores onde cada termo representa o número de casos daquele dia. 
   Ex: para a sequência {7,3,19,5,15,10} seria gerada a sequência {7,10,29,34,49,59}

   Formulação recursiva
    f([]) = Inválido
    f([a1], acc) = [a1 + acc]
    f([a1, ...an], acc) = [a1 + acc, ...f(an, a1 + acc)]
*/

const f = lista => !lista ? "Valor Inválido" : fAux(lista, 0);

const fAux = ([a1, ...an], acc) => an.length == 0 ? [a1 + acc] : [a1 + acc, ...fAux(an, a1 + acc)];

const lista = [7, 3, 19, 5, 15, 10];

console.log(f(lista));
