import {SET_ROADS} from '~/constants/RoadsConstants'

const initialState = {
    pipes: undefined
};

export default function pipes(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                pipes: action.pipes
            }
        default:
            return state;
    }
}
