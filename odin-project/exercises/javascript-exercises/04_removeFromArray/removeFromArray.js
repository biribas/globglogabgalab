const removeFromArray = function(array, ...args) {
  return array.filter(e => !args.includes(e));
};

// Do not edit below this line
module.exports = removeFromArray;
