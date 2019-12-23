import React from "react";
import {connect} from "react-redux";
import AwareLayer from "./AwareLayer";

const AwareLayerContainer = ({aware, waypointTemplate,userPreferences}) => {
    return (
        <AwareLayer
            aware={aware}
            waypointTemplate={waypointTemplate}
            userPreferences={userPreferences}
        />
    )
};

const mapStateToProps = state => {
    return {
        aware: state.aware,
        waypointTemplate: state.waypointTemplate,
        userPreferences: state.userPreferences
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AwareLayerContainer)
