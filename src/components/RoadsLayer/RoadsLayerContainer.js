import React from "react";
import {connect} from "react-redux";
import RoadsLayer from "./RoadsLayer";

const RoadsLayerContainer = ({roads}) => {

    return(
        <RoadsLayer roads={roads}/>
    )
};

const mapStateToProps = (state) => {
    return {
        roads: state.roads,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadsLayerContainer)
