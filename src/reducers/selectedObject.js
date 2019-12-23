import {
    SELECT_BRIDGE,
    SELECT_DANGER_ROAD,
    SELECT_PIPE,
    SELECT_PIPELINE,
    SELECT_ROAD,
    SELECT_TUNNEL,
} from '../constants/SelectConstants'

const initialState = {
    selectedRoad: undefined,
    selectedBridge: undefined,
    selectedDangerRoad: undefined,
    selectedTunnel: undefined,
    selectedPipe: undefined,
    selectedPipeline: undefined,

};

export default function selectedObject(state = initialState, action) {
    switch (action.type) {

        case SELECT_ROAD:
            return {
                selectedRoad: action.payload
            };
        case SELECT_BRIDGE:
            return {
                selectedBridge: action.payload
            };
        case SELECT_DANGER_ROAD:
            return {
                selectedDangerRoad: action.payload
            };

        case SELECT_TUNNEL:
            return {
                selectedTunnel: action.payload
            };
        case SELECT_PIPE:
            return {
                selectedPipe: action.payload
            };
        case SELECT_PIPELINE:
            return {
                selectedPipeline: action.payload
            };
        default:
            return state;
    }
}
