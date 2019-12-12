const getLinestringFromArray = (array) => {
    let result = 'LINESTRING (';

    if (!array.length) {
      result = null
    } else {
        for (let it = 0; it < array.length-1; it++) {
            result+=`${array[it][1]} ${array[it][0]},`
        }
        result+=`${array[array.length-1][1]} ${array[array.length-1][0]})`
    }
    return result;
};

export default getLinestringFromArray;
