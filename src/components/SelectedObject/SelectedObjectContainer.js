import React from "react";
import {connect} from "react-redux";
import SelectedObject from "./SelectedObject";

const SelectedObjectContainer = ({road, bridge, userPreferences,dangerRoad}) => {

    return (
        <SelectedObject
            road={road}
            bridge={bridge}
            dangerRoad={dangerRoad}
            userPreferences={userPreferences}
            />
    )
}

const mapStateToProps = state => {
    return {
        road: state.selectedObject.selectedRoad,
        bridge: state.selectedObject.selectedBridge,
        dangerRoad: state.selectedObject.selectedDangerRoad,
        userPreferences: state.userPreferences
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedObjectContainer)
