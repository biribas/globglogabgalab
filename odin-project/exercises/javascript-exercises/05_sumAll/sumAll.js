const sumAll = function(num1, num2) {
  if (typeof num1 != 'number' || typeof num2 != 'number' || num1 < 0 || num2 < 0) 
    return 'ERROR';

  if (num1 > num2)
    return aux(num2, num1);

  return aux(num1, num2);

  function aux (n1, n2) {
    if (n1 == n2) return n1;
    return n1 + aux(n1 + 1, n2);
  }
};

// Do not edit below this line
module.exports = sumAll;
