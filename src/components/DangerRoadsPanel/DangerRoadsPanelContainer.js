import React from "react";
import {connect} from "react-redux";
import DangerRoadsPanel from "./DangerRoadsPanel";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";

const DangerRoadsPanelContainer = ({dangerRoads, handleSelectDetailedObject,mapActions,selectObjectsActions}) => {


    const moveMapToObject = (object) => {
        mapActions.setCenterAndZoom(getPointsArrayFromLinestring(object.path)[0]);
        selectObjectsActions.selectDangerRoad(object);
    }


    return (
        <DangerRoadsPanel
            dangerRoads={dangerRoads}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        dangerRoads:state.dangers,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DangerRoadsPanelContainer);
