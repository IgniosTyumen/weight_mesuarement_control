import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import PipelinesPanel from "./PipelinesPanel";


const PipelinesPanelContainer = ({pipelines, handleSelectDetailedObject,mapActions,selectObjectsActions}) => {

    const moveMapToObject = (object) => {
        if(object.point && object.point.length) {
            mapActions.setCenterAndZoom(getPointsArrayFromPoint(object.point)[0]);
        }
        selectObjectsActions.selectPipe(object);
    }

    return (
        <PipelinesPanel
            pipelines={pipelines}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        pipelines:state.pipelines,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PipelinesPanelContainer);
