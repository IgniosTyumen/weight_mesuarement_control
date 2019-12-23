import React from "react";
import {connect} from "react-redux";
import SelectedObject from "./SelectedObject";

const SelectedObjectContainer = ({road, bridge, userPreferences,dangerRoad,tunnel,
                                     pipe,
                                     pipeline}) => {

    return (
        <SelectedObject
            road={road}
            bridge={bridge}
            dangerRoad={dangerRoad}
            userPreferences={userPreferences}
            tunnel={tunnel}
            pipe={pipe}
            pipeline={pipeline}
            />
    )
}

const mapStateToProps = state => {
    return {
        road: state.selectedObject.selectedRoad,
        bridge: state.selectedObject.selectedBridge,
        dangerRoad: state.selectedObject.selectedDangerRoad,
        tunnel: state.selectedObject.selectedTunnel,
        pipe: state.selectedObject.selectedPipe,
        pipeline: state.selectedObject.selectedPipeline,
        userPreferences: state.userPreferences
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedObjectContainer)
