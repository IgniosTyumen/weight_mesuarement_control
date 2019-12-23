import React from "react";
import {connect} from "react-redux";
import RoadControlPanel from "./RoadControlPanel";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";


const RoadControlPanelContainer = ({roads, handleSelectDetailedObject, mapActions, selectObjectsActions}) => {



    const moveMapToObject = (object) => {
        if(object.point && object.point.length) {
            mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.line_path)[0]);
        }
        selectObjectsActions.selectRoad(object);
    }


    return (
        <RoadControlPanel
            roads={roads}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        roads:state.roads,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadControlPanelContainer);
