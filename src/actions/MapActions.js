import {
  SET_CENTER,
  GEOMETRY_WIGHT,
  SET_VIEWPORT_COORDINATES,
    SET_ZOOM,
  SET_CENTER_AND_ZOOM
} from "~/constants/Map";

export function setCenter(latlng) {
  return {
    type: SET_CENTER,
    payload: latlng
  }
}

export function setCenterAndZoomChange(latlng,zoom) {
  return {
    type: SET_CENTER_AND_ZOOM,
    center: latlng,
    zoom: zoom
  }
}

export function setZoom(value) {
  return {
    type: SET_ZOOM,
    payload: value
  }
}

export function geometryWightChange(value) {
  return {
    type: GEOMETRY_WIGHT,
    payload: value
  }
}

export function setCenterAndZoom(latlng, zoom=14) {
  return {
    type: SET_VIEWPORT_COORDINATES,
    viewport: latlng,
    zoom:zoom
  }
}

