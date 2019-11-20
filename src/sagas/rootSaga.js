import { all } from 'redux-saga/effects'
import {watchInitialize} from "./initializeSaga";


export default function* rootSaga(){
    yield all([
            watchInitialize()
        ]
    )
}
