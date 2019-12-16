import {
    INITIALIZE_FAILURE,
    INITIALIZE_SUCCESS,
    SET_BRIDGES_DOWNLOADED,
    SET_BRIDGES_TO_DOWNLOAD,
    SET_DANGERS_DOWNLOADED,
    SET_DANGERS_TO_DOWNLOAD,
    SET_ROADS_DOWNLOADED,
    SET_ROADS_TO_DOWNLOAD,
} from "~/constants/AppGlobalConstants";

import {SET_ALL_USER_PREFERENCES,} from '~/constants/UserSettingsConstants'


import {
    SET_USER_AUTH_PARAMS,
    START_USER_AUTH_FETCHING,
    USER_AUTH_FETCHING_FAILURE,
    USER_AUTH_FETCHING_SUCCESS,
} from '~/constants/UserAuthParams'


import {SET_ROADS} from "~/constants/RoadsConstants";

import {all, call, put, takeEvery} from 'redux-saga/effects'
import {dangersApi, documentsApi, roadsApi, userApi} from "../api/api";
import getPointsArrayFromLinestring from "../utils/getPointsArrayFromLinestring";
import {initialState} from "../reducers/userPreferences";

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
            let roadColor = localStorage.getItem('roadColor')!=='null' ? localStorage.getItem('roadColor') : initialState.roadColor;
            let roadWidth = localStorage.getItem('roadWidth')!=='null' ? localStorage.getItem('roadWidth') : initialState.roadWidth;
            let dangerRoadsWidth = localStorage.getItem('dangerRoadsWidth')!=='null' ? localStorage.getItem('dangerRoadsWidth') : initialState.dangerRoadsWidth;
            let dangerRoadsStrokeLength = localStorage.getItem('dangerRoadsStrokeLength')!=='null' ? localStorage.getItem('dangerRoadsStrokeLength') : initialState.dangerRoadsStrokeLength;
            let dangerRoadsColor1 = localStorage.getItem('dangerRoadsColor1')!=='null' ? localStorage.getItem('dangerRoadsColor1') : initialState.dangerRoadsColor1;
            let dangerRoadsColor2 = localStorage.getItem('dangerRoadsColor2')!=='null' ? localStorage.getItem('dangerRoadsColor2') : initialState.dangerRoadsColor2;
            let signsVisibleListStr = localStorage.getItem('signsVisibleList')!=='null' ? localStorage.getItem('signsVisibleList').split('-')  : initialState.signsVisibleList;
            let colorRoadFederal = localStorage.getItem('colorRoadFederal')!=='null' ? localStorage.getItem('colorRoadFederal') : initialState.colorRoadFederal;
            let colorRoadRegional = localStorage.getItem('colorRoadRegional')!=='null' ? localStorage.getItem('colorRoadRegional') : initialState.colorRoadRegional;
            let colorRoadMunicipal = localStorage.getItem('colorRoadMunicipal')!=='null' ? localStorage.getItem('colorRoadMunicipal') : initialState.colorRoadMunicipal;
            let lineWidthRoadFederal = localStorage.getItem('lineWidthRoadFederal')!=='null' ? localStorage.getItem('lineWidthRoadFederal') : initialState.lineWidthRoadFederal;
            let lineWidthRoadRegional = localStorage.getItem('lineWidthRoadRegional')!=='null' ? localStorage.getItem('lineWidthRoadRegional') : initialState.lineWidthRoadRegional;
            let lineWidthRoadMunicipal = localStorage.getItem('lineWidthRoadMunicipal')!=='null' ? localStorage.getItem('lineWidthRoadMunicipal') : initialState.lineWidthRoadMunicipal;
            let endpointRouteVisible = localStorage.getItem('endpointRouteVisible')!=='null' ? localStorage.getItem('endpointRouteVisible') : initialState.endpointRouteVisible;
            let endpointRouteWidth = localStorage.getItem('endpointRouteWidth')!=='null' ? localStorage.getItem('endpointRouteWidth') : initialState.endpointRouteWidth;
            let startDrawMarkerSize= localStorage.getItem('startDrawMarkerSize')!=='null' ? localStorage.getItem('startDrawMarkerSize') : initialState.startDrawMarkerSize;
            let endDrawMarkerSize= localStorage.getItem('endDrawMarkerSize')!=='null' ? localStorage.getItem('endDrawMarkerSize') : initialState.endDrawMarkerSize;
            let middleDrawMarkerSize= localStorage.getItem('middleDrawMarkerSize')!=='null' ? localStorage.getItem('middleDrawMarkerSize') : initialState.middleDrawMarkerSize;
            let pseudoDrawMarkerSize= localStorage.getItem('pseudoDrawMarkerSize')!=='null' ? localStorage.getItem('pseudoDrawMarkerSize') : initialState.pseudoDrawMarkerSize;
            let signsSize= localStorage.getItem('signsSize')!=='null' ? localStorage.getItem('signsSize') : initialState.signsSize;
            let zoomMinSignsRender= localStorage.getItem('zoomMinSignsRender')!=='null' ? localStorage.getItem('zoomMinSignsRender') : initialState.zoomMinSignsRender;
            let zoomMaxSignsRender= localStorage.getItem('zoomMaxSignsRender')!=='null' ? localStorage.getItem('zoomMaxSignsRender') : initialState.zoomMaxSignsRender;
            let widthDrawLine= localStorage.getItem('widthDrawLine')!=='null' ? localStorage.getItem('widthDrawLine') : initialState.widthDrawLine;

            yield put({
                type: SET_ALL_USER_PREFERENCES,
                signsVisibleList: signsVisibleListStr ,
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
                widthDrawLine
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
