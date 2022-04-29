// Reimplementação do método Array.prototype.map()

Array.prototype.myMap = function(callback, thisArg) {
    if (this == null)
        throw new TypeError("this is null or not defined");
    
    return map(callback, this, this, 0, thisArg);
}

const map = (callback, orginalArray, [first, ...rest], index, thisArg) => {
    if (typeof first == 'undefined')
        return [];
    else {
        const mappedValue = callback.call(thisArg, first, index, orginalArray);
        return [mappedValue, ...map(callback, orginalArray, rest, index + 1, thisArg)];
    }
}

const mappedArray = [0, 1, 2, 3, 4, 5].myMap((e, i, array) => e * i);

console.log(mappedArray);