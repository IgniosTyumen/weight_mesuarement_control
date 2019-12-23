import {SET_ROADS} from '~/constants/RoadsConstants'

const initialState = {
    pipelines: undefined
};

export default function pipelines(state = initialState, action) {
    switch (action.type) {
        case SET_ROADS:
            return {
                ...state,
                pipelines: action.pipelines
            }
        default:
            return state;
    }
}
