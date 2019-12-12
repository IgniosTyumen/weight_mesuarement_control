import {
    SAVE_DIRECTION,
    REMOVE_WAYPOINT
} from '~/constants/WaypointsConstants'



import { call, put, takeEvery, takeLatest, all, take } from 'redux-saga/effects'

import {documentsApi, roadsApi, signsApi} from "../api/api";
import {calculateLengthOfPolyline} from "../utils/calculateLengthOfPolyline";
import getLinestringFromArray from "../utils/getLinestringFromArray";


function* updateDocumentActionsSaga(action) {
    try {
        const waypoint = action.waypoint.templateWaypoint;
        const auth = action.auth;
        const waypointId = waypoint.id;
        const documentId = action.waypoint.orderNumber;
        const waypointLength = calculateLengthOfPolyline(waypoint.geometry.points)
        yield call(()=>documentsApi.updateWaypoint(waypoint,waypointId,documentId,waypointLength,auth));
        yield put({
            type: SAVE_DIRECTION,
            payload: action.waypoint
        });
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
        yield put({
            type: SAVE_DIRECTION,
            payload: action.waypoint
        });
    } catch (e) {
        console.log(e)
    }
}

function* deleteDocumentActionsSaga(action) {
    try {
        const waypointId = action.waypoint;
        const response = yield call(()=>documentsApi.deleteWaypoint(waypointId));
        console.log(response)

        yield put({
            type:REMOVE_WAYPOINT,
            payload:response.data.id
        })
    } catch (e) {

    }
}

export function* watchDocumentActionsSaga(){
    yield takeEvery('UPDATE_WAYPOINT', updateDocumentActionsSaga)
    yield takeEvery('CREATE_WAYPOINT', createDocumentActionsSaga)
    yield takeEvery('DELETE_WAYPOINT', deleteDocumentActionsSaga)
}
