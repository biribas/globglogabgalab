const ftoc = function(temp) {
  const result = (temp - 32) * (5 / 9);
  return result.toFixed(1);
};

const ctof = function(temp) {
  const result = ((9 / 5) * temp + 32, 1);
  return result.toFixed(1);
};


// Do not edit below this line
module.exports = {
  ftoc,
  ctof
};
