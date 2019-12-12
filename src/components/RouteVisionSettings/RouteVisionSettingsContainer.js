import React from "react";
import {connect} from "react-redux";
import RouteVisionSettings from "./RouteVisionSettings";
import {bindActionCreators} from "redux";
import * as preferencesActions from '~/actions/ChangePreferencesActions'

const RouteVisionSettingsContainer = ({userPreferencesActions, userPreferences})  => {

    return (
        <RouteVisionSettings
            userPreferencesActions={userPreferencesActions}
            userPreferences={userPreferences}

        />
    )
};

const mapStateToProps = state => {
    return {
        userPreferences: state.userPreferences,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userPreferencesActions: bindActionCreators(preferencesActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteVisionSettingsContainer);
