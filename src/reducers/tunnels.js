import {SET_ROADS} from '~/constants/RoadsConstants'

const initialState = {
    tunnels: undefined
};

export default function bridges(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                tunnels: action.tunnels
            }
        default:
            return state;
    }
}
