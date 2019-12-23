import {put, takeEvery} from 'redux-saga/effects'
import {lineString, point} from "@turf/helpers";
import buffer from "@turf/buffer";
import getPointsArrayFromLinestring from "../utils/getPointsArrayFromLinestring";
import {area, intersect, length as lengthOfPoly, lineSlice, nearestPointOnLine} from "@turf/turf";


const calculateThrowAndCrossing = (road, roadArray) => {
    let crossing = [];
    let trough = [];
    let lineWay;
    if (road.length && road.length >= 2) {
        try {
            lineWay = lineString(road);
            const roadBuffer = buffer(lineWay, 0.01);
            for (let it = 0; it < roadArray.length; it++) {
                if (roadArray[it].line_path) {
                    const lineRoad = lineString(getPointsArrayFromLinestring(roadArray[it].line_path));
                    // const intersections = lineIntersect(lineWay, lineRoad);
                    const lineRoadBuffer = buffer(lineRoad, 0.01)
                    const roadsSelected = intersect(roadBuffer, lineRoadBuffer);
                    if (roadsSelected) {
                        const squareOfArea = area(roadsSelected);
                        if (squareOfArea<100000) continue
                        let inKm = Number.MAX_VALUE;
                        let outKm = -1;
                        for (let itPoly=0;itPoly< roadsSelected.geometry.coordinates.length; itPoly++ ){

                            for (let itPoints=0;itPoints< roadsSelected.geometry.coordinates[itPoly].length; itPoints++){
                                try {
                                    let closestPoint;
                                    if (roadsSelected.geometry.coordinates[itPoly][itPoints].length && roadsSelected.geometry.coordinates[itPoly][itPoints].length>2){
                                        for (let itPointsInline=0;itPointsInline< roadsSelected.geometry.coordinates[itPoly][itPoints].length; itPointsInline++){
                                            closestPoint = nearestPointOnLine(lineRoad, point(roadsSelected.geometry.coordinates[itPoly][itPoints][itPointsInline]));
                                            const startPoint = point(lineRoad.geometry.coordinates[0]);
                                            const sliced = lineSlice(startPoint, closestPoint, lineRoad);
                                            const distance = lengthOfPoly(sliced);
                                            if (distance > outKm) outKm = distance;
                                            if (distance < inKm) inKm = distance;
                                        }
                                    } else {
                                        closestPoint = nearestPointOnLine(lineRoad, roadsSelected.geometry.coordinates[itPoly][itPoints]);
                                        const startPoint = point(lineRoad.geometry.coordinates[0]);
                                        const sliced = lineSlice(startPoint, closestPoint, lineRoad);
                                        const distance = lengthOfPoly(sliced);
                                        if (distance > outKm) outKm = distance;
                                        if (distance < inKm) inKm = distance;
                                    }
                                } catch (e) {
                                    console.warn('error on point' + e)
                                }
                            }
                        }
                        const troughObj = {
                            road: roadArray[it],
                            points: roadsSelected.geometry,
                            entryKm: inKm,
                            exitKm : outKm
                        }
                        trough.push(troughObj)
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return [crossing, trough]
}

function* paperRouteSaga(action) {
   const roadTemplate = action.pointsArray;
   const roadsAll = action.roadsArray;

   const [crossing, trough] = calculateThrowAndCrossing(roadTemplate.geometry.points,roadsAll);
    yield put({
        type:'SET_ROUTE_PAPER',
        crossings: crossing,
        roads: trough
    })

}

export function* paperRouteSagaWatcher(){
    yield takeEvery('CALCULATE_PAPER_ROUTE', paperRouteSaga)
}
