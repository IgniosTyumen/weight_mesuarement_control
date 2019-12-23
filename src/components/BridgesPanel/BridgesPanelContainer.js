import React from "react";
import {connect} from "react-redux";
import BridgesPanel from "./BridgesPanel";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";


const BridgesPanelContainer = ({bridges, handleSelectDetailedObject,mapActions,selectObjectsActions}) => {

    const moveMapToObject = (object) => {
        if(object.point && object.point.length) {
            mapActions.setCenterAndZoom(getPointsArrayFromPoint(object.point)[0]);
        }
        selectObjectsActions.selectBridge(object);
    }

    return (
        <BridgesPanel
            bridges={bridges}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        bridges:state.bridges,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BridgesPanelContainer);
