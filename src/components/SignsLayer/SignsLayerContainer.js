import React, {Fragment} from "react";
import {connect} from "react-redux";
import SignsLayer from "./SignsLayer";

const SignsLayerContainer = ({roadsigns,visibleList,signsVisibleList,userPreferences}) => {

    return (
        <Fragment>
            {visibleList.indexOf("signs") < 0 && <SignsLayer roadsigns={roadsigns} signsVisibleList={signsVisibleList} userPreferences={userPreferences}/>}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        roadsigns: state.roadsigns,
        visibleList: state.visibleFilter.invisibleList,
        signsVisibleList: state.signsVisibleList.signsVisibleList,
        userPreferences:state.userPreferences,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignsLayerContainer);
