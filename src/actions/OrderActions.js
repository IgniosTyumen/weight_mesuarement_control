import {
    SET_ACTIVE_ORDER,
    SET_ORDER_PREVIEW
} from "~/constants/OrderConstants";


export const makeOrderActive = (order) => dispatch =>{
    dispatch( {
        type: SET_ACTIVE_ORDER,
        payload: order
    })
}

export const setOrderPreview = (order) => dispatch =>{
    dispatch( {
        type: SET_ORDER_PREVIEW,
        payload: order
    })
}
