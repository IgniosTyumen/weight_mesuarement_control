import {SET_AWARE_SEGMENTS, SET_ROUTE_PAPER,} from '../constants/AwareConstants'

const initialState = {
    aware: [],
    crossings: [],
    roads: [],
    bridges: [],
    tunnels:[],
    pipes:[],
    signs:[],
    importanceNoRightsCrossings:[]
};

export default function aware(state = initialState, action) {
    switch (action.type) {
        case SET_AWARE_SEGMENTS:
            return {
                ...state,
                aware: action.payload
            };
    case SET_ROUTE_PAPER:
            return {
                ...state,
                crossings: action.crossings,
                roads: action.roads
            };
        default:
            return state;
    }
}


