import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import DrawPanel from "./DrawPanel";
import {roadsApi} from "../../api/api";
import * as waypointActions from '../../actions/WaypointActions'
import * as appActions from '../../actions/AppActions'
import * as mapActions from '../../actions/MapActions'
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {bindActionCreators} from "redux";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import {cleanCoords, simplify} from "@turf/turf";
import {lineString} from "@turf/helpers";

const mapStateToProps = state => {
    return {
        waypointsTemplateGeometry: state.waypointTemplate.templateWaypoint,
        editMode: state.map.editMode,
        pullMode: state.map.pullMode,
        visibleOfEditMarkers : state.map.showEditMarkers,
        waypointTemplate: state.waypointTemplate,
        userAuth: state.userAuth,
        roads: state.roads.roads,
        dictionaries : state.dictionaries
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        waypointActions: bindActionCreators(waypointActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
        mapActions: bindActionCreators(mapActions, dispatch)
    }
};

const DrawPanelContainer = (
    {
        waypointsTemplateGeometry,
        waypointActions,
        editMode,
        pullMode,
        appActions,
        waypointTemplate,
        userAuth,
        dispatch,
        roads,
        dictionaries,
        mapActions,
        visibleOfEditMarkers}) => {

    const [blockPanel, setBlockPanel] = useState(false);
    const [templateHistory, setTemplateHistory] = useState([]);
    const [templateHistoryID, setTemplateHistoryID] = useState();
    const [undoMake, setUndoMake] = useState(false);


    const handleProjectTemplate = async () => {
        setBlockPanel(true)
        const response = await roadsApi.projectArray(waypointsTemplateGeometry.geometry.points)
        if (response.data.success) {
           templateHistory.push(waypointsTemplateGeometry.geometry.points);
            let projectedWay = response.data.wkt;
            const points = getPointsArrayFromLinestring(projectedWay);
            let projectedLinestring = lineString(points);
            projectedLinestring = cleanCoords(projectedLinestring);
            // const simplifySettings = {tolerance: 0.01, highQuality: true };
            // while (projectedLinestring.geometry.coordinates.length>75){
            //     projectedLinestring = simplify(projectedLinestring,simplifySettings);
            // }
            waypointActions.changeCheckpoint(projectedLinestring.geometry.coordinates);
        }
        setBlockPanel(false)
    }


    const handleReverse = () => {
        setBlockPanel(true)
        waypointActions.swapDirection();
        setBlockPanel(false)
    }

    const handleSwitchEditMode = async () => {
        appActions.switchAddMarkerMode()
    }
    const handleSwitchPullMode = () => {
        appActions.switchPullMarkerMode()
    }

    const handleUndo = () => {
        const upHistory = templateHistory.pop();
        setUndoMake(true);
        waypointActions.changeCheckpoint(upHistory.geometry.points);
    };

    const handleSave = () => {
            if (waypointTemplate.templateWaypoint.id === "newCheckpoint"){
                waypointActions.saveNewWaypoint(waypointTemplate,userAuth)
            } else {
                waypointActions.saveWaypoint(waypointTemplate,userAuth)
            }
    }

    const handleShowDangers = () => {
        waypointActions.calculateAwareData(waypointsTemplateGeometry.geometry.points)
    }

    const dispatchAwareObjects = () => {
        waypointActions.calculateAwareData(waypointsTemplateGeometry)
    }

    const dispatchPaperRoute = () => {
        waypointActions.calculatePaperRoute(waypointsTemplateGeometry, roads)
    }

    const setPointToWaypointList = (point,direction) => {
        if (point) {

            const geoposition = getPointsArrayFromPoint(point);
            switch (direction) {
                case 'front': {
                    waypointActions.pushCheckpointToStart([geoposition[0][0], geoposition[0][1]]);
                    break;
                }
                case 'end' : {
                    waypointActions.pushCheckpoint([geoposition[0][0], geoposition[0][1]]);
                    break;
                }
            }
            mapActions.setCenterAndZoom([geoposition[0][0], geoposition[0][1]],8)
        }
    };

    const handleToggleMarkers = () => {
        waypointActions.toggleEditMarkersShow()
    }

    const handleSimplify = () => {
        let coef = 1;
        const points = waypointsTemplateGeometry.geometry.points;
        let projectedLinestring = lineString(points);
        projectedLinestring = cleanCoords(projectedLinestring);
        const simplifySettings = {tolerance: 0.001*coef, highQuality: true };
        while (true){
            const simplifySettings = {tolerance: 0.001*coef, highQuality: true };
            projectedLinestring = simplify(projectedLinestring,simplifySettings);
            if (projectedLinestring.geometry.coordinates.length<points.length || points.length<=2) {
                break
            } else {
                coef++
            }
        }

        waypointActions.changeCheckpoint(projectedLinestring.geometry.coordinates);
        templateHistory.push(waypointsTemplateGeometry)
    }

    //Effect of pushing history
    useEffect(
        ()=>{
            if (undoMake){
                setUndoMake(false)
            } else {
                if (templateHistory[templateHistory.length - 1] != waypointsTemplateGeometry){
                    templateHistory.push(waypointsTemplateGeometry)
                }
            }
        }, [waypointsTemplateGeometry]
    )

    return (
        <DrawPanel
            waypointsTemplateGeometry={waypointsTemplateGeometry}
            handleProjectTemplate={handleProjectTemplate}
            handleReverse={handleReverse}
            handleSwitchEditMode={handleSwitchEditMode}
            handleSwitchPullMode={handleSwitchPullMode}
            handleUndo={handleUndo}
            handleSave={handleSave}
            blockPanel={blockPanel}
            editMode={editMode}
            pullMode={pullMode}
            templateHistory ={templateHistory}
            handleShowDangers={handleShowDangers}
            dispatchAwareObjects={dispatchAwareObjects}
            dispatchPaperRoute={dispatchPaperRoute}
            dictionaries={dictionaries}
            setPointToWaypointList={setPointToWaypointList}
            mapActions={mapActions}
            handleToggleMarkers={handleToggleMarkers}
            visibleOfEditMarkers={visibleOfEditMarkers}
            handleSimplify={handleSimplify}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawPanelContainer)
