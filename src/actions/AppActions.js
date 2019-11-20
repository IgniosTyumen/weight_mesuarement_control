import {
    INITIALIZE_APP
} from "~/constants/AppGlobalConstants";

export const initApp = () => (dispatch) => {
    dispatch({type: INITIALIZE_APP});
};


