import {
    SET_WAYPOINT_TEMPLATE,
    SAVE_WAYPOINT_TEMPLATE,
    CHANGE_WAYPOINT_STATUS,
    CHANGE_WAYPOINT_COMMENT,
    NEW_WAYPOINT_TEMPLATE,
    CHANGE_CHECKPOINT_STATUS,
    CHANGE_CHECKPOINT_POSITION,
    ADD_CHECKPOINT_MARKER,
    PUSH_CHECKPOINT_MARKER,
    PUSH_CHECKPOINT_MARKER_TO_START,
    REMOVE_CHECKPOINT_MARKER,
    CHANGE_ALL_CHECKPOINTS,
    SWAP_CHECKPOINTS_DIRECTION,
    SAVE_DIRECTION,
    CHANGE_NAME_OF_TEMPLATE_WAYPOINT,
    CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT,
    CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT,
    REMOVE_WAYPOINT
} from '~/constants/WaypointsConstants'

const initialState = {
    templateWaypoint: undefined,
    orderNumber: undefined,
    waypointNumber: undefined,
};


const insert = (arr,index, ...newItems ) => [
    ...arr.slice(0, index),
    ...newItems,
    ...arr.slice(index)
]

export default function waypointTemplate(state = initialState, action) {
    switch (action.type) {
        case NEW_WAYPOINT_TEMPLATE:
            return {
                templateWaypoint: {},
                orderNumber: action.orderId,
                waypointNumber: action.waypointId
            }
        case CHANGE_ALL_CHECKPOINTS:
            {
                let newState = {...state};
                newState.templateWaypoint.geometry.points = [...action.payload];
                return newState;
            }
            case SWAP_CHECKPOINTS_DIRECTION:
            {
                let newState = {...state};
                newState.templateWaypoint.geometry.points = [...newState.templateWaypoint.geometry.points.reverse()];
                return newState;
            }
        case SET_WAYPOINT_TEMPLATE:
            return {
                templateWaypoint: action.waypoint,
                orderNumber: action.orderId,
                waypointNumber: action.waypointId
            }
        case CHANGE_CHECKPOINT_POSITION: {
            let newState = {...state};
            newState.templateWaypoint.geometry.points = [...newState.templateWaypoint.geometry.points];
            newState.templateWaypoint.geometry.points[action.checkpointPosition] = action.latlng
            return newState;
        }
        case ADD_CHECKPOINT_MARKER: {
            let newState = {...state};
            const upd = insert(newState.templateWaypoint.geometry.points, action.checkpointPosition, action.latlng);
            newState.templateWaypoint.geometry.points = [...upd];
            return newState;
        }
        case PUSH_CHECKPOINT_MARKER: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [...state.templateWaypoint.geometry.points, action.payload]
                    }
                }
            }
        }
        case PUSH_CHECKPOINT_MARKER_TO_START: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [ action.payload, ...state.templateWaypoint.geometry.points]
                    }
                }
            }
        }
        case REMOVE_CHECKPOINT_MARKER: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    geometry: {
                        ...state.templateWaypoint.geometry,
                        points: [ ...state.templateWaypoint.geometry.points.filter((element, index)=> index!==action.payload)]
                    }
                }
            }
        }
        case SAVE_DIRECTION: {
            return {
                ...initialState
            }
        }
        case CHANGE_NAME_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    road_name: action.payload
                }
            }
        }

        case CHANGE_DISTRICT_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    district_id: action.districtId,
                    district_name: action.districtName
                }
            }
        }
        case CHANGE_IMPORTANCE_OF_TEMPLATE_WAYPOINT: {
            return {
                ...state,
                templateWaypoint: {
                    ...state.templateWaypoint,
                    importance: action.payload
                }
            }
        }
        default:
            return state;
    }
}
