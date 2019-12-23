import React from "react";
import {connect} from "react-redux";
import OrderControlPanel from "./OrderControlPanel";
import * as waypointActions from '~/actions/WaypointActions'
import * as mapActions from '~/actions/MapActions'
import {bindActionCreators} from "redux";

const OrderControlPanelContainer = props => {
    const {activeOrder, waypointActions,waypointTemplate,mapActions, userAuth, awareList} = props;

    const handleSave = () => {
        if (waypointTemplate.templateWaypoint.id === "newCheckpoint"){
            waypointActions.saveNewWaypoint(waypointTemplate,userAuth)
        } else {
            waypointActions.saveWaypoint(waypointTemplate,userAuth)
        }
    }

    const handleNewWaypoint = () => {
        waypointActions.createWaypoint(activeOrder.number, activeOrder.waypoints.length,userAuth);
    }

    const dispatchAwareObjects = () => {
        waypointActions.calculateAwareData(waypointsTemplateGeometry)
    }

    const handleQuit = () => {
        waypointActions.quitWithoutSaving()
    }

    return (
        <OrderControlPanel
            waypointTemplate={waypointTemplate}
            activeOrder={activeOrder}
            waypointActions={waypointActions}
            handleSave={handleSave}
            handleNewWaypoint={handleNewWaypoint}
            mapActions={mapActions}
            userAuth={userAuth}
            dispatchAwareObjects={dispatchAwareObjects}
            awareList={awareList}
            handleQuit={handleQuit}
        />
    )
};

const mapStateToProps = state => {
    return {
        activeOrder: state.activeOrder.activeOrder,
        waypointTemplate: state.waypointTemplate,
        userAuth: state.userAuth,
        awareList: state.aware
    }
};

const mapDispatchToProps = dispatch => {
    return {
        waypointActions: bindActionCreators(waypointActions, dispatch),
        mapActions: bindActionCreators(mapActions,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderControlPanelContainer)
