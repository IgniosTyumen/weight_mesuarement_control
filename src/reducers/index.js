import {combineReducers} from "redux";
import map from "../reducers/map";
import roads from "../reducers/roads";
import bridges from "../reducers/bridges";
import dangers from "../reducers/dangers";
import roadsigns from "../reducers/roadsigns";
import visibleFilter from "../reducers/layersVisible";
import initial from "../reducers/initial";
import signsVisibleList from "../reducers/signsVisibleList";
import userPreferences from "../reducers/userPreferences";
import selectedObject from "../reducers/selectedObject";
import activeOrder from "../reducers/activeOrder";
import waypointTemplate from "../reducers/waypointTemplate";
import userAuth from "../reducers/userAuth";
import aware from "../reducers/awareLayer";
import tunnels from "../reducers/tunnels";
import pipes from "./pipes";
import pipelines from "./pipelines";
import dictionaries from "./urlAutocompleteDictionaries";


export default combineReducers({
  map,
  roads,
  bridges,
  roadsigns,
  visibleFilter,
  initial,
  dangers,
  signsVisibleList,
  userPreferences,
  selectedObject,
  activeOrder,
  waypointTemplate,
  userAuth,
  aware,
  tunnels,
  pipes,
  pipelines,
  dictionaries
})
