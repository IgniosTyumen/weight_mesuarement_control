import { combineReducers } from "redux";
import map from "~/reducers/map";
import roads from "~/reducers/roads";


export default combineReducers({
  map,
  roads
})
