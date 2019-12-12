import {
    START_USER_AUTH_FETCHING,
    USER_AUTH_FETCHING_SUCCESS,
    USER_AUTH_FETCHING_FAILURE,
    SET_USER_AUTH_PARAMS,
} from '~/constants/UserAuthParams'

const initialState = {}

export default function userAuth(state = initialState, action) {
    switch (action.type) {
        case SET_USER_AUTH_PARAMS:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
