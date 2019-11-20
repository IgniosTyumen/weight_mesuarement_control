import {
    INITIALIZE_APP,
    INITIALIZE_SUCCESS,
    INITIALIZE_FAILURE,
} from "~/constants/AppGlobalConstants";


import {
    SET_ROADS
} from "~/constants/RoadsConstants";

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {roadsApi} from "../api/api";



function* initialize() {
        try {


            const response = yield call(roadsApi.getAllRoads);
            const roadsWithRoadPath = yield response.data.roads.filter(road => road['line_path'] !== null);
            yield put(
                {
                    type:SET_ROADS,
                    payload: roadsWithRoadPath
                }
            );
            yield put(
                {
                    type: INITIALIZE_SUCCESS,
                }
            );
        } catch (e) {
            console.log(e);
            yield put({type: INITIALIZE_FAILURE})
        }

}

export function* watchInitialize(){
    yield takeEvery('INITIALIZE_APP', initialize)
}
