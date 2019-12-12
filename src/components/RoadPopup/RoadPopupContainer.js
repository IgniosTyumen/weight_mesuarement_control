import React from "react";
import {connect} from "react-redux";
import RoadPopup from "./RoadPopup";

const RoadPopupContainer = ({road,  dispatch}) => {
    return (
    <RoadPopup
        road={road}
        dispatch={dispatch}
    />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch:dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( RoadPopupContainer)
