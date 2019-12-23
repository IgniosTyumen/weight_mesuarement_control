import React, {Fragment} from "react";
import {connect} from "react-redux";
import TunnelsLayer from "./TunnelsLayer";


const TunnelsLayerContainer = ({tunnels,visibleList}) => {



    return (
        <Fragment>
            {visibleList.indexOf("tunnels") < 0 && <TunnelsLayer tunnels={tunnels} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        tunnels: state.tunnels,
        visibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TunnelsLayerContainer);
