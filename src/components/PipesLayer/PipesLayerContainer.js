import React, {Fragment} from "react";
import {connect} from "react-redux";
import PipesLayer from "./PipesLayer";


const PipesLayerContainer = ({pipes,visibleList}) => {



    return (
        <Fragment>
            {visibleList.indexOf("pipes") < 0 && <PipesLayer pipes={pipes} />}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        pipes: state.pipes,
        visibleList: state.visibleFilter.invisibleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PipesLayerContainer);
