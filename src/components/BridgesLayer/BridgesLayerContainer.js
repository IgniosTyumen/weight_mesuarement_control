import React, {Fragment} from "react";
import {connect} from "react-redux";
import BridgesLayer from "./BridgesLayer";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import {bindActionCreators} from "redux";
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";


const BridgesLayerContainer = ({bridges,visibleList}) => {



    return (
        <Fragment>
            {visibleList.indexOf("bridges") < 0 && <BridgesLayer bridges={bridges} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        bridges: state.bridges,
        visibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BridgesLayerContainer);
