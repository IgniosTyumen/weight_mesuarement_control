import {
    SELECT_BRIDGE,
    SELECT_DANGER_ROAD,
    SELECT_PIPE,
    SELECT_PIPELINE,
    SELECT_ROAD,
    SELECT_TUNNEL,
} from "../constants/SelectConstants";

export const selectRoad = (object) => dispatch =>{
     dispatch( {
        type: SELECT_ROAD,
        payload: object
    })
}

export const selectBridge = (object) => dispatch =>{
     dispatch( {
        type: SELECT_BRIDGE,
        payload: object
    })
}

export const selectDangerRoad = (object) => dispatch =>{
     dispatch( {
        type: SELECT_DANGER_ROAD,
        payload: object
    })
}

export const selectTunnel = (object) => dispatch =>{
    dispatch( {
        type: SELECT_TUNNEL,
        payload: object
    })
}

export const selectPipe = (object) => dispatch =>{
    dispatch( {
        type: SELECT_PIPE,
        payload: object
    })
}

export const selectPipeline = (object) => dispatch =>{
    dispatch( {
        type: SELECT_PIPELINE,
        payload: object
    })
}
