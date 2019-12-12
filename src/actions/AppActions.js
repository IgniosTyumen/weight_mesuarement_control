import {
    INITIALIZE_APP,
    ENABLE_ADD_MARKER_MODE,
    DISABLE_ADD_MARKER_MODE,
    SWITCH_ADD_MARKER_MODE,
    SWITCH_PULL_MARKER_MODE
} from "~/constants/AppGlobalConstants";

export const initApp = (props) => (dispatch) => {
    dispatch({type: INITIALIZE_APP,
            url:props.location.pathname.replace('/','')
    });
};

export const enableAddMarkerMode = () => (dispatch) => {
    dispatch({type:ENABLE_ADD_MARKER_MODE})
}

export const disableAddMarkerMode = () => (dispatch) => {
    dispatch({type:DISABLE_ADD_MARKER_MODE})
}

export const switchAddMarkerMode = () => (dispatch) => {
    dispatch({type:SWITCH_ADD_MARKER_MODE})
}
export const switchPullMarkerMode = () => (dispatch) => {
    dispatch({type:SWITCH_PULL_MARKER_MODE})
}
