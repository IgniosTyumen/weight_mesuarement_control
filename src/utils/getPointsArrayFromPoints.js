const getPointsArrayFromPoint = (str) => {
    let result = [];
    let pointsStr = '';
    if (str) {
        pointsStr = str.replace('POINT (', '').replace(')', '')
        const workOnArray = pointsStr.trim().split(' ');
        result.push([Number.parseFloat(workOnArray[1]), Number.parseFloat(workOnArray[0])])
        return result;
    } else {
        return null
    }

};

export default getPointsArrayFromPoint;
