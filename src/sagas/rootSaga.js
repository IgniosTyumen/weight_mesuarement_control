import {all} from 'redux-saga/effects'
import {watchGetFullRoadInfoSaga} from "./getFullRoadInfoSaga";
import {watchInitializeMixed} from "./initializeSagaMixedData";
import {watchDocumentActionsSaga} from "./documentSaga";
import {watchAwareObjectsSagaWatcher} from "./awareSaga";
import {paperRouteSagaWatcher} from "./paperRouteSaga";


export default function* rootSaga() {
    yield all([
            watchInitializeMixed(),
            watchGetFullRoadInfoSaga(),
            watchDocumentActionsSaga(),
            watchAwareObjectsSagaWatcher(),
            paperRouteSagaWatcher()
        ]
    )
}
