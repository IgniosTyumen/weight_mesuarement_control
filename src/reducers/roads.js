import {
    SET_ROADS
} from '~/constants/RoadsConstants'

const initialState = {
    roads: undefined
};

export default function road(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                roads: action.payload
            }
        default:
            return state;
    }
}
