import {call, put, takeEvery} from 'redux-saga/effects'

import {documentsApi} from "../api/api";
import {calculateLengthOfPolyline} from "../utils/calculateLengthOfPolyline";
import getLinestringFromArray from "../utils/getLinestringFromArray";
import getPointsArrayFromLinestring from "../utils/getPointsArrayFromLinestring";
import {SET_ROUTE_PAPER} from "../constants/AwareConstants";

function* uploadOrder(documentNumber) {
    try {
        const response = yield call(() => documentsApi.getDocumentData(documentNumber));
        let avgAxleLoad= 0;
        if (response.data.objects.statement.axle_loads) {
            const avgAxleLoadStr = response.data.objects.statement.axle_loads.split('-');
            let sum = 0;
            for (let it=0;it<avgAxleLoadStr.length;it++){
                sum+=Number.parseFloat(avgAxleLoadStr[it]);

            }
            if (avgAxleLoadStr.length) {
                avgAxleLoad = sum / avgAxleLoadStr.length
            }
        }

        let order = {
            number: documentNumber,
            waypoints: response.data.objects.routes,
            statement: response.data.objects.statement,
            axle_load: avgAxleLoad

        }


        for (let it = 0; it < order.waypoints.length; it++) {
            if (order.waypoints[it].path) {
                if (order.waypoints[it].path === "GEOMETRYCOLLECTION EMPTY") {
                    order.waypoints[it] = {
                        ...order.waypoints[it],
                        geometry: {
                            points: []
                        },
                        path: ''
                    }
                } else {
                    order.waypoints[it] = {
                        ...order.waypoints[it],
                        geometry: {
                            points: getPointsArrayFromLinestring(order.waypoints[it].path)
                        }
                    }
                }
            } else {
                order.waypoints[it] = {
                    ...order.waypoints[it],
                    geometry: {
                        points: []
                    }
                }
            }
        }
        return order;
    } catch (error) {


    }
}

function* reloadOrder(action,idOnDelete=null){
    let urlDocumentNumber;
    if (idOnDelete){
        urlDocumentNumber=idOnDelete
    } else {
        urlDocumentNumber = action.waypoint.orderNumber;
    }
    const order = yield call(()=>uploadOrder(urlDocumentNumber));
    yield put(
        {
            type: 'SET_ACTIVE_ORDER',
            payload: order
        }
    )

    yield put(
        {
            type: 'SET_ORDER_PREVIEW',
            payload: order
        }
    )

    yield put ({
        type: 'SET_ROUTE_PAPER',
        crossings: [],
        roads: []
    })

    yield put(
        {
            type: 'QUIT_DIRECTION_WITHOUT_SAVING',
        }
    )
}

function* updateDocumentActionsSaga(action) {
    try {
        const waypoint = action.waypoint.templateWaypoint;
        const auth = action.auth;
        const waypointId = waypoint.id;
        const documentId = action.waypoint.orderNumber;
        const waypointLength = calculateLengthOfPolyline(waypoint.geometry.points)
        yield call(()=>documentsApi.updateWaypoint(waypoint,waypointId,documentId,waypointLength,auth));
        // yield put({
        //     type: SAVE_DIRECTION,
        //     payload: action.waypoint
        // });
        yield call(()=>reloadOrder(action));
    } catch (e) {
        console.log(e)
    }

}

function* createDocumentActionsSaga(action) {
    try {
        const waypoint = action.waypoint;
        const auth = action.auth;
        const waypointId = waypoint.templateWaypoint.id;
        const documentId = action.waypoint.orderNumber;
        const waypointLength = calculateLengthOfPolyline(waypoint.templateWaypoint.geometry.points)
        const response = yield call(()=>documentsApi.createWaypoint(waypoint,waypointId,documentId,waypointLength,auth));
        waypoint.templateWaypoint.id = response.data.id
        waypoint.templateWaypoint.path = getLinestringFromArray(waypoint.templateWaypoint.geometry.points)
        yield call(()=>reloadOrder(action));
        // yield put({
        //     type: SAVE_DIRECTION,
        //     payload: action.waypoint
        // });
    } catch (e) {
        console.log(e)
    }
}

function* deleteDocumentActionsSaga(action) {
    try {
        const waypointId = action.waypoint.id;
        const idOnDelete = action.orderId;
        const response = yield call(()=>documentsApi.deleteWaypoint(waypointId));
        yield call(()=>reloadOrder(null, idOnDelete));
        // yield put({
        //     type:REMOVE_WAYPOINT,
        //     payload:response.data.id
        // })
    } catch (e) {

    }
}

export function* watchDocumentActionsSaga(){
    yield takeEvery('UPDATE_WAYPOINT', updateDocumentActionsSaga)
    yield takeEvery('CREATE_WAYPOINT', createDocumentActionsSaga)
    yield takeEvery('DELETE_WAYPOINT', deleteDocumentActionsSaga)
}
