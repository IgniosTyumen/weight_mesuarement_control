import {
    INITIALIZE_APP,
    INITIALIZE_SUCCESS,
    INITIALIZE_FAILURE,
    SET_ROADS_TO_DOWNLOAD,
    SET_ROADS_DOWNLOADED,
    SET_SIGNS_TO_DOWNLOAD,
    SET_SIGNS_DOWNLOADED,
    SET_BRIDGES_TO_DOWNLOAD,
    SET_BRIDGES_DOWNLOADED,
    ITERATE_ROADS_DOWNLOADED,
    ITERATE_SIGNS_DOWNLOADED,
    ITERATE_BRIDGES_DOWNLOADED,
    SET_DANGERS_TO_DOWNLOAD,
    SET_DANGERS_DOWNLOADED,
} from "~/constants/AppGlobalConstants";

import {
    SET_ALL_USER_PREFERENCES,
} from '~/constants/UserSettingsConstants'


import {
    START_USER_AUTH_FETCHING,
    USER_AUTH_FETCHING_SUCCESS,
    USER_AUTH_FETCHING_FAILURE,
    SET_USER_AUTH_PARAMS,
} from '~/constants/UserAuthParams'


import {
    SET_ROADS
} from "~/constants/RoadsConstants";

import {call, put, takeEvery, takeLatest, all} from 'redux-saga/effects'
import {dangersApi, documentsApi, roadsApi, testRequests, userApi} from "../api/api";
import {getFakeOrderList} from "../utils/fakeOrderList";
import getPointsArrayFromLinestring from "../utils/getPointsArrayFromLinestring";

let counterBridgesDownloaded = 0;
let counterSignsDownloaded = 0;
let counterRoadsDownloaded = 0;
let counterDangersDownloaded = 0;


function* uploadRoads(page) {
    const responseRoads = yield call(() => roadsApi.getAllRoads());

    counterRoadsDownloaded++;
    yield put({type: SET_ROADS_DOWNLOADED, payload: counterRoadsDownloaded});
    return responseRoads.data;
}

function* uploadBridges(page) {
    // const response = yield call(()=>testRequests.testPutSequence());
    const bridge = yield  call(() => roadsApi.getAllBridges(page));
    counterBridgesDownloaded++;
    yield put({type: SET_BRIDGES_DOWNLOADED, payload: counterBridgesDownloaded});
    return bridge;
}

function* uploadDangerRoads(page) {
    const danger = yield  call(() => dangersApi.getAllDangers(page));
    counterDangersDownloaded++;
    yield put({type: SET_DANGERS_DOWNLOADED, payload: counterDangersDownloaded});
    return danger;
}

function* uploadOrder(documentNumber) {
    try {
        put({
            type: START_USER_AUTH_FETCHING
        })
        const [response, auth] = yield all([call(() => documentsApi.getDocumentData(documentNumber)), call(() => userApi.getUserAccessParams())]);
        let order = {
            number: documentNumber,
            waypoints: response.data.objects

        }

        const userAuthModel = {
            importanceRights: {
                all: auth.data.can_edit_all_roads,
                federal: auth.data.can_edit_federal_roads,
                regional: auth.data.can_edit_regional_roads,
                municipal: auth.data.can_edit_municipal_roads,
                tyumen: auth.data.can_edit_tyumen_roads,
            },
            districtRights: auth.data.districts,
            userId: auth.data.id,
            email: auth.data.email,
            first_name: auth.data.first_name,
            last_name: auth.data.last_name,
            phone: auth.data.phone,
            middle_name: auth.data.middle_name

        };
        yield put({
            type: SET_USER_AUTH_PARAMS,
            payload: userAuthModel
        })
        yield put({
            type: USER_AUTH_FETCHING_SUCCESS
        })
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
        put({
            type: USER_AUTH_FETCHING_FAILURE
        })
        console.log(error);
        throw error
    }
}

function* initialize(action) {
    try {

        let bridges = [];
        let dangers = [];

        const urlDocumentNumber = action.url;


        const [bridgesResponse, dangersResponse, order] = yield all([uploadBridges(1), uploadDangerRoads(1), uploadOrder(urlDocumentNumber)]);

        counterBridgesDownloaded++;
        counterDangersDownloaded++;

        const totalPagesBridges = bridgesResponse.data.total_pages;
        const totalPagesDangers = dangersResponse.data.total_pages;


        bridges = bridgesResponse.data.objects;
        dangers = dangersResponse.data.objects;

        let sagasBridges = [];
        let sagasDangers = [];


        yield put({
            type: SET_BRIDGES_TO_DOWNLOAD,
            payload: totalPagesBridges,
        });
        yield put({
            type: SET_DANGERS_TO_DOWNLOAD,
            payload: totalPagesDangers,
        });
        yield put({
            type: SET_ROADS_TO_DOWNLOAD,
            payload: 1,
        });

        const localSettings = localStorage.getItem('customSettings');
        if (localSettings) {
            const roadColor = localStorage.getItem('roadColor');
            const roadWidth = localStorage.getItem('roadWidth');
            const dangerRoadsWidth = localStorage.getItem('dangerRoadsWidth');
            const dangerRoadsStrokeLength = localStorage.getItem('dangerRoadsStrokeLength');
            const dangerRoadsColor1 = localStorage.getItem('dangerRoadsColor1');
            const dangerRoadsColor2 = localStorage.getItem('dangerRoadsColor2');
            const signsVisibleListStr = localStorage.getItem('signsVisibleList').split('-');
            const colorRoadFederal = localStorage.getItem('colorRoadFederal');
            const colorRoadRegional = localStorage.getItem('colorRoadRegional');
            const colorRoadMunicipal = localStorage.getItem('colorRoadMunicipal');
            const lineWidthRoadFederal = localStorage.getItem('lineWidthRoadFederal');
            const lineWidthRoadRegional = localStorage.getItem('lineWidthRoadRegional');
            const lineWidthRoadMunicipal = localStorage.getItem('lineWidthRoadMunicipal');
            const endpointRouteVisible = localStorage.getItem('endpointRouteVisible');
            const endpointRouteWidth = localStorage.getItem('endpointRouteWidth');
            const startDrawMarkerSize= localStorage.getItem('startDrawMarkerSize');
            const endDrawMarkerSize= localStorage.getItem('endDrawMarkerSize');
            const middleDrawMarkerSize= localStorage.getItem('middleDrawMarkerSize');
            const pseudoDrawMarkerSize= localStorage.getItem('pseudoDrawMarkerSize');
            const signsSize= localStorage.getItem('signsSize');
            const zoomMinSignsRender= localStorage.getItem('zoomMinSignsRender');
            const zoomMaxSignsRender= localStorage.getItem('zoomMaxSignsRender');

            yield put({
                type: SET_ALL_USER_PREFERENCES,
                signsVisibleList: signsVisibleListStr,
                roadColor,
                roadWidth,
                dangerRoadsWidth,
                dangerRoadsStrokeLength,
                dangerRoadsColor1,
                dangerRoadsColor2,
                colorRoadFederal,
                colorRoadRegional,
                colorRoadMunicipal,
                lineWidthRoadFederal,
                lineWidthRoadRegional,
                lineWidthRoadMunicipal,
                endpointRouteVisible,
                endpointRouteWidth,
                startDrawMarkerSize,
                endDrawMarkerSize,
                middleDrawMarkerSize,
                pseudoDrawMarkerSize,
                signsSize,
                zoomMinSignsRender,
                zoomMaxSignsRender,
            })

        }


        for (let page = 2; page <= totalPagesBridges; page++) {
            sagasBridges.push(call(() => uploadBridges(page)));
        }

        for (let page = 2; page <= totalPagesDangers; page++) {
            sagasDangers.push(call(() => uploadDangerRoads(page)));
        }


        // simple road Download
        const sagasRoads = [];
        sagasRoads.push(call(() => uploadRoads()));


        const [allRoads, otherBridges, otherDangers] = yield all([all(sagasRoads), all(sagasBridges), all(sagasDangers)]);

        for (let it in otherBridges) {
            for (let it2 in otherBridges[it].data.objects) {
                bridges.push(otherBridges[it].data.objects[it2])
            }
        }

        for (let it in otherDangers) {
            for (let it2 in otherDangers[it].data.objects) {
                dangers.push(otherDangers[it].data.objects[it2])
            }
        }

        yield put(
            {
                type: SET_ROADS,
                roads: allRoads[0].roads,
                bridges: bridges,
                roadsigns: [],
                dangers: dangers,
            }
        );

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

        yield put(
            {
                type: INITIALIZE_SUCCESS,
            }
        );
    } catch (e) {
        yield put({type: INITIALIZE_FAILURE})
    }

}

export function* watchInitializeMixed() {
    yield takeEvery('INITIALIZE_APP', initialize)
}
