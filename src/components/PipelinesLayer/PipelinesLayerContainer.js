import React, {Fragment} from "react";
import {connect} from "react-redux";
import PipelinesLayer from "./PipelinesLayer";


const PipelinesLayerContainer = ({pipelines,visibleList}) => {



    return (
        <Fragment>
            {visibleList.indexOf("pipes") < 0 && <PipelinesLayer pipelines={pipelines} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        pipelines: state.pipelines,
        visibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PipelinesLayerContainer);
