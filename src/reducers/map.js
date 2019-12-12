import {
  SET_CENTER,
  GEOMETRY_WIGHT,
  SET_VIEWPORT_COORDINATES,
  SET_ZOOM,
  SET_CENTER_AND_ZOOM
} from "~/constants/Map";

import {
  ENABLE_ADD_MARKER_MODE,
  DISABLE_ADD_MARKER_MODE,
  SWITCH_ADD_MARKER_MODE,
  SWITCH_PULL_MARKER_MODE
} from "~/constants/AppGlobalConstants";

const initialState = {
  center: [57.144075, 65.5579277777778],
  zoom: 10,
  tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  geometryWight: 7,
  viewport : [57.144075, 65.5579277777778],
  editMode: false,
  pullMode: false,
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: action.payload
      }
      case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        center: action.center,
        zoom: action.zoom
      }
      case SET_ZOOM:
      return {
        ...state,
        zoom: action.payload
      }
    case GEOMETRY_WIGHT:
      return {
        ...state,
        geometryWight: action.payload
      }
      case SET_VIEWPORT_COORDINATES:
      return {
        ...state,
        center: action.viewport,
        zoom: action.zoom
      }
    case ENABLE_ADD_MARKER_MODE:
      return {
        ...state,
        editMode: true,
      }
    case DISABLE_ADD_MARKER_MODE:
      return {
        ...state,
        editMode: false,
      }
      case SWITCH_ADD_MARKER_MODE:
        if (!state.pullMode) {
          return {
            ...state,
            editMode: !state.editMode,
          }
        } else {
          return {
            ...state,
            editMode: !state.editMode,
            pullMode: false
          }
        }
      case SWITCH_PULL_MARKER_MODE:
        if (!state.editMode) {
          return {
            ...state,
            pullMode: !state.pullMode,
          }
        } else {
          return {
            ...state,
            pullMode: !state.pullMode,
            editMode: false
          }
        }
    default:
      return state;
  }
}
