import React from "react";
import {connect} from "react-redux";
import SignsVisionFilter from "./SignsVisionFilter";
import * as signsVisibleListActions from '~/actions/SignsFilterActions'
import {bindActionCreators} from "redux";
import SignsVisionFilterF from "./SignsVisionFilterF";

const SignsVisionFilterContainer = props => {
    return (
        <SignsVisionFilterF
            signsVisibleListActions={props.signsVisibleListActions}
        />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        signsVisibleListActions : bindActionCreators(signsVisibleListActions, dispatch),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignsVisionFilterContainer)
