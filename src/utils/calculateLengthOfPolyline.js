import {calculateLengthBetweenPoints} from "./calculateLengthBetweenPoints";

export const calculateLengthOfPolyline = (polyline) => {
    let distance = 0;
    for (let it = 1; it < polyline.length; it++) {
        distance += calculateLengthBetweenPoints(polyline[it - 1], polyline[it]);
    }
    return distance / 1000;
}
