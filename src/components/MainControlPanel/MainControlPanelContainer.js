import React from "react";
import {connect} from "react-redux";
import MainControlPanel from "./MainControlPanel";


const MainControlPanelContainer = (props) => {
    return (
        <MainControlPanel

        />
    )
};

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainControlPanelContainer);
