import {
  SET_CENTER,
  GEOMETRY_WIGHT,
} from "~/constants/Map";

const initialState = {
  center: [57.144075, 65.5579277777778],
  zoom: 10,
  tile: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  geometryWight: 7,
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: action.payload
      }
    case GEOMETRY_WIGHT:
      return {
        ...state,
        geometryWight: action.payload
      }
    default:
      return state;
  }
}
