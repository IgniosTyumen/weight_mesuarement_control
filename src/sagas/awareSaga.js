import {call, put, takeEvery} from 'redux-saga/effects'

import {awareApi} from "../api/api";


function* watchAwareObjectsSaga(action) {
    try {
        const path = action.payload.geometry.points;
        const response = yield call(()=>awareApi.calculateAware(path));
        yield put({
            type:'SET_AWARE_SEGMENTS',
            payload:response.data.objects
        })


    } catch (e) {
        yield put({type:'REQUEST_AWARE_SEGMENTS_FAILURE'});
    }
}

export function* watchAwareObjectsSagaWatcher(){
    yield takeEvery('REQUEST_AWARE_SEGMENTS', watchAwareObjectsSaga)
}
