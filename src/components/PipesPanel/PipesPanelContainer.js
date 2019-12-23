import React from "react";
import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import PipesPanel from "./PipesPanel";


const PipesPanelContainer = ({pipes, handleSelectDetailedObject,mapActions,selectObjectsActions}) => {

    const moveMapToObject = (object) => {
        if(object.point && object.point.length) {
            mapActions.setCenterAndZoom(getPointsArrayFromPoint(object.point)[0]);
        }
        selectObjectsActions.selectPipe(object);
    }

    return (
        <PipesPanel
            pipes={pipes}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {
        pipes:state.pipes,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PipesPanelContainer);
