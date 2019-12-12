import {
    SELECT_ROAD,
    SELECT_BRIDGE,
    SELECT_DANGER_ROAD
} from '~/constants/SelectConstants'

const initialState = {
    selectedRoad: undefined,
    selectedBridge: undefined,
    selectedDangerRoad: undefined,

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
        default:
            return state;
    }
}
