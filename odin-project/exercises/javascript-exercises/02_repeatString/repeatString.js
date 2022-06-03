const repeatString = function(string, num) {
  if(num < 0) return ('ERROR');
  if (num === 0) return '';
  return string + repeatString(string, num - 1);
};

// Do not edit below this line
module.exports = repeatString;
