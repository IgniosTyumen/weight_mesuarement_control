import {
  SET_CENTER,
  GEOMETRY_WIGHT,
} from "~/constants/Map";

export function setCenter(latlng) {
  return {
    type: SET_CENTER,
    payload: latlng
  }
}

export function geometryWightChange(value) {
  return {
    type: GEOMETRY_WIGHT,
    payload: value
  }
}


